import { Injectable } from '@angular/core';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { Camera } from 'src/app/models/camera.model';
import { PagedList } from 'src/app/models/page.model';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { PassengerServerRequestService } from 'src/app/network/request/passenger/passenger-request.service';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { StoreService } from 'src/app/tools/service/store.service';
import {
  CameraModel,
  CameraTableArgs,
} from '../setting-camera-table/setting-camera-table.model';

@Injectable()
export class SettingCameraBusiness {
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService,
    private sr: SRServerRequestService,
    private passenger: PassengerServerRequestService,
  ) {}

  async load(index: number, size: number, args: CameraTableArgs) {
    let datas = await this.data.load(index, size, args);
    if (datas.Page.RecordCount == 0 && datas.Page.PageIndex > 1) {
      datas = await this.data.load(index - 1, size, args);
    }
    let hall = await this.store.getBusinessHall();
    let paged = new PagedList<CameraModel>();
    paged.Page = datas.Page;
    paged.Data = datas.Data.map((x) => this.convert(x, hall));

    return paged;
  }

  private convert(data: Camera, hall: BusinessHall) {
    let model = new CameraModel();
    model = Object.assign(model, data);
    model.HallName = hall.Name;
    if (model.FloorId) {
      model.FloorName = this.service.floor
        .get(hall.Id, model.FloorId)
        .then((x) => {
          return x.Name;
        });
    }
    if (model.SRServerId) {
      let server = this.sr.get(model.SRServerId);
      model.SRServerName = server.then((x) => x.Name);
    }
    if (model.PassengerServerUnid) {
      let server = this.passenger.get(model.PassengerServerUnid);
      model.PassengerServerName = server.then((x) => x.Name);
    }
    return model;
  }

  async remove(id: string) {
    let hall = await this.store.getBusinessHall();
    return this.service.camera.delete(hall.Id, id);
  }
  async create(data: Camera) {
    data.Id = '';
    data.CreateTime = new Date();
    data.UpdateTime = new Date();

    let hall = await this.store.getBusinessHall();

    return this.service.camera.create(hall.Id, data);
  }
  async update(data: Camera) {
    data.UpdateTime = new Date();

    let hall = await this.store.getBusinessHall();

    return this.service.camera.update(hall.Id, data);
  }

  data = {
    load: async (index: number, size: number, args: CameraTableArgs) => {
      let hall = await this.store.getBusinessHall();
      let params = new GetCamerasParams();
      // list() 打的是 BusinessHalls/Cameras/List（不带 hallId），
      // 不过滤 HallIds 的话会把别的营业厅的摄像机也查出来
      params.HallIds = [hall.Id];
      params.PageIndex = index;
      params.PageSize = size;
      params.Name = args.name;
      if (args.usage != undefined) {
        params.Usage = args.usage;
      }
      if (args.status != undefined) {
        params.Status = args.status;
      }
      if (args.floor) {
        params.FloorIds = [args.floor];
      }

      return this.service.camera.list(params);
    },
  };
}

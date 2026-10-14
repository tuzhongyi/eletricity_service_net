import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeDeviceListTableConverter } from './realtime-device-table.converter';
import { RealtimeDeviceModel } from './realtime-device-table.model';

@Injectable()
export class RealtimeDeviceListTableBusiness implements IBusiness<
  Camera[],
  RealtimeDeviceModel<Camera>[]
> {
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService,
    private config: ConfigRequestService,
  ) {}

  Converter: IConverter<Camera[], RealtimeDeviceModel<Camera>[]> =
    new RealtimeDeviceListTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(hallId?: string): Promise<RealtimeDeviceModel<Camera>[]> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    try {
      let data = await this.getData(hallId);
      let model = this.Converter.Convert(data);
      return model;
    } catch (error) {
      if ((await this.config.get()).test) {
        return this.test();
      }
      throw error;
    }
  }
  private test() {
    let cameras = new Array();
    for (let i = 0; i < 14; i++) {
      let camera = new Camera();
      camera.Id = i.toString();
      camera.Name = '测试' + i;
      cameras.push(camera);
    }
    return this.Converter.Convert(cameras);
  }
  async getData(hallId: string): Promise<Camera[]> {
    let params = new GetCamerasParams();
    params.HallIds = [hallId];
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { Medium } from 'src/app/network/request/medium/medium';
import { StoreService } from 'src/app/tools/service/store.service';
import { CameraPositionSettingConverter } from './camera-position-setting.converter';

@Injectable()
export class CameraPositionSettingBusiness
  implements IBusiness<Camera[], IPoint[]>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}
  Converter: IConverter<Camera[], IPoint[]> =
    new CameraPositionSettingConverter();
  loading?: EventEmitter<void> | undefined;
  async load(floorId: string): Promise<IPoint[]> {
    let data = await this.getData(floorId);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(floorId: string): Promise<Camera[]> {
    let params = new GetCamerasParams();
    params.FloorIds = [floorId];
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
  setFloor(floor: Floor) {
    return this.service.floor.update(floor);
  }
  async setCamera(camera: Camera) {
    let hall = await this.store.getBusinessHall();
    return this.service.camera.update(hall.Id, camera);
  }
  async getFloor(id: string) {
    let hall = await this.store.getBusinessHall();
    return this.service.floor.get(hall.Id, id);
  }
  async updatePlan(floorId: string, str: string) {
    let hall = await this.store.getBusinessHall();
    return this.service.floor.plan.post(hall.Id, floorId, str);
  }

  getPicture(id: string) {
    return firstValueFrom(
      this.service.basic.http.get(Medium.data(id), { responseType: 'text' })
    );
  }
}

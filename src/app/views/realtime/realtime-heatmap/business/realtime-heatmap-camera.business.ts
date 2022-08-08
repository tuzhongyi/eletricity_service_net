import { EventEmitter, Injectable } from '@angular/core';
import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import {
  CameraToPointArrayConverter,
  CameraToPointConverter,
} from 'src/app/converters/point.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

@Injectable()
export class RealtimeHeatmapCameraBusniess
  implements IBusiness<Camera[], IPoint<Camera>[]>
{
  constructor(private service: BusinessHallRequestService) {}

  Converter: IConverter<Camera[], IPoint<Camera>[]> =
    new CameraToPointArrayConverter();
  async load(floorId: string): Promise<IPoint<Camera>[]> {
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
}

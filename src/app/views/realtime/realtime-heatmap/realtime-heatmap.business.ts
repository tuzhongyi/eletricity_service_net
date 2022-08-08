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
import { IModel } from 'src/app/models/model.interface';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { RealtimeHeatmapCameraBusniess } from './business/realtime-heatmap-camera.business';
import { RealtimeHeatmapFloorBusniess } from './business/realtime-heatmap-floor.business';
import { RealtimeHeatmapModel } from './realtime-heatmap.model';

@Injectable()
export class RealtimeHeatmapBusniess
  implements IBusiness<IModel, RealtimeHeatmapModel[]>
{
  constructor(
    private floor: RealtimeHeatmapFloorBusniess,
    private camera: RealtimeHeatmapCameraBusniess
  ) {}
  Converter!: IConverter<IModel, RealtimeHeatmapModel<any>[]>;
  loading?: EventEmitter<void> | undefined;
  async load(...args: any): Promise<RealtimeHeatmapModel<any>[]> {
    return await this.floor.load();
  }
  getData(...args: any): Promise<IModel> {
    throw new Error('Method not implemented.');
  }
}

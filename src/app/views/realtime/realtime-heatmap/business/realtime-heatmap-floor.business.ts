import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Floor } from 'src/app/models/floor.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { Medium } from 'src/app/network/request/medium/medium';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeHeatmapFloorArrayConverter } from '../realtime-heatmap.converter';
import { RealtimeHeatmapModel } from '../realtime-heatmap.model';
import { RealtimeHeatmapCameraBusniess } from './realtime-heatmap-camera.business';

@Injectable()
export class RealtimeHeatmapFloorBusniess
  implements IBusiness<Floor[], RealtimeHeatmapModel[]>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService,
    private camera: RealtimeHeatmapCameraBusniess,
    private medium: Medium
  ) {}

  Converter: IPromiseConverter<Floor[], RealtimeHeatmapModel[]> =
    new RealtimeHeatmapFloorArrayConverter();
  loading?: EventEmitter<void> | undefined;
  async load(hallId?: string): Promise<RealtimeHeatmapModel[]> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    let data = await this.getData(hallId);
    let model = await this.Converter.Convert(data, {
      point: (id: string) => {
        return this.camera.load(id);
      },
      base64: (id: string) => {
        return this.service.floor.plan.get(id);
      },
    });
    return model;
  }
  getData(hallId: string): Promise<Floor[]> {
    return this.service.floor.array(hallId);
  }
}

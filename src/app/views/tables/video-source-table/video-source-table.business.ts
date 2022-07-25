import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { VideoSourceTableConverter } from './video-source-table.converter';
import { VideoSourceTableItemModel } from './video-source-table.model';

@Injectable()
export class VideoSourceTableBusiness
  implements IBusiness<Camera[], VideoSourceTableItemModel<Camera>[]>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}
  Converter: IConverter<Camera[], VideoSourceTableItemModel<Camera>[]> =
    new VideoSourceTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(hallId?: string): Promise<VideoSourceTableItemModel<Camera>[]> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    let data = await this.getData(hallId);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(hallId: string): Promise<Camera[]> {
    return this.service.camera.array(hallId);
  }
}

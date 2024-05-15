import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
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
  async load(
    hallId?: string,
    name?: string
  ): Promise<VideoSourceTableItemModel<Camera>[]> {
    let data = await this.getData(hallId, name);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(hallId?: string, name?: string): Promise<Camera[]> {
    let params = new GetCamerasParams();
    params.Name = name;
    if (hallId) {
      params.HallIds = [hallId];
    }
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
}

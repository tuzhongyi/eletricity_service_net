import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { Medium } from 'src/app/network/request/medium/medium';
import { StoreService } from 'src/app/tools/service/store.service';
import { StrangerRecordModel } from './people-stranger-record-list-item.model';

@Injectable()
export class PeopleStrangerRecordListItemConverter {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}
  convert(source: StrangerRecord) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(StrangerRecordModel, plain);
    model.FacePictureUrl = this.image(
      source.HallId,
      source.Description,
      source.FacePictureUrl
    );
    model.BackgroundUrl = this.image(
      source.HallId,
      source.Description,
      source.BackgroundUrl
    );

    if (model.FaceSetMatch) {
      model.FaceSetMatch.FaceUrl = this.image(
        source.HallId,
        source.Description,
        model.FaceSetMatch.FaceUrl
      );
    }

    return model;
  }

  image(hallId: string = '', deviceId: string = '', url: string = '') {
    return Medium.data(url);
    // return this.service.camera.picture.get(hallId, deviceId, url);
  }
}

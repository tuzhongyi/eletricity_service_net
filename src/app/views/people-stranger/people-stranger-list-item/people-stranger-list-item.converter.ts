import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Stranger } from 'src/app/models/stranger.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { Medium } from 'src/app/network/request/medium/medium';
import { StoreService } from 'src/app/tools/service/store.service';
import { StrangerModel } from './people-stranger-list-item.model';

@Injectable()
export class PeopleStrangerListItemConverter {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}
  convert(source: Stranger) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(StrangerModel, plain);

    if (model.FacePictureUrl) {
      model.FacePicture = this.image(source);
    }
    return model;
  }

  image(data: Stranger) {
    return Medium.data(data.FacePictureUrl);

    // return this.service.camera.picture.get(
    //   data.HallId,
    //   data.DeviceId,
    //   data.FacePictureUrl ?? ''
    // );
  }
}

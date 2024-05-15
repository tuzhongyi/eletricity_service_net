import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Base64 } from 'js-base64';
import { Stranger } from 'src/app/models/stranger.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
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
      model.FacePicture = Base64.decode(model.FacePictureUrl);
    }

    // model.FacePicture =
    //   'http://192.168.21.202:80/picture/Streaming/tracks/203/?name=ch00002_010001400117f3efc000033ac000000000004fdd77eb0ac9b000&;size=13228';

    return model;
  }
}

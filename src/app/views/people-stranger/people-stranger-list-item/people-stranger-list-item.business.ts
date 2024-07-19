import { Injectable } from '@angular/core';
import { Stranger } from 'src/app/models/stranger.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { PeopleStrangerListItemConverter } from './people-stranger-list-item.converter';

@Injectable()
export class PeopleStrangerListItemBusiness {
  constructor(
    private service: BusinessHallRequestService,
    private converter: PeopleStrangerListItemConverter
  ) {}

  convert(source: Stranger) {
    return this.converter.convert(source);
  }

  image(data: Stranger) {
    return this.service.camera.picture.get(
      data.HallId,
      data.DeviceId,
      data.FacePictureUrl ?? ''
    );
    // if (data.FaceIds && data.FaceIds.length > 0) {
    //   let faceId = data.FaceIds[0];
    //   return this.service.camera.picture.get(
    //     data.HallId,
    //     data.DeviceId,
    //     data.Name ?? ''
    //   );
    // }
    // return undefined;
  }
}

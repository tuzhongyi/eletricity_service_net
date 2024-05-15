import { Injectable } from '@angular/core';
import { Stranger } from 'src/app/models/stranger.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

@Injectable()
export class PeopleStrangerManagerBusiness {
  constructor(private service: BusinessHallRequestService) {}

  async update(datas: Stranger[], enabled: boolean) {
    let all = datas
      .filter((x) => x.Enabled != enabled)
      .map((x) => {
        x.Enabled = enabled;
        return this.service.stranger.update(x);
      });

    if (all.length == 0) {
      return false;
    }

    return Promise.all(all).then((x) => {
      return true;
    });
  }
}

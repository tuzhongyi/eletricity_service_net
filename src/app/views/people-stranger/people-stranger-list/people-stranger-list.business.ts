import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page.model';
import { Stranger } from 'src/app/models/stranger.model';
import { GetStrangerParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { PeopleStrangerListOptions } from './people-stranger-list.model';

@Injectable()
export class PeopleStrangerListBusiness
  implements IBusiness<PagedList<Stranger>>
{
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}

  async load(opts: PeopleStrangerListOptions) {
    let hall = await this.store.getBusinessHall();
    let datas = await this.getData(hall.Id, opts);
    return datas;
  }

  getData(hallId: string, opts: PeopleStrangerListOptions) {
    let params = new GetStrangerParams();
    params.PageIndex = opts.pageIndex;
    params.PageSize = opts.pageSize;
    params.BeginTime = opts.begin;
    params.EndTime = opts.end;
    params.Enabled = opts.enabled;
    params.Occurrences = opts.occurrence;
    params.Desc = 'Occurrences';
    return this.service.stranger.list(hallId, params);
  }

  update(data: Stranger) {
    return this.service.stranger.update(data);
  }
}

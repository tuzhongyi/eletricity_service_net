import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Page, PagedList } from 'src/app/models/page.model';
import { Stranger } from 'src/app/models/stranger.model';
import { MergeStrangerParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { CompareTool } from 'src/app/tools/compare-tool/compare.tool';
import { StoreService } from 'src/app/tools/service/store.service';
import { PeopleStrangerListItemConverter } from '../people-stranger-list-item/people-stranger-list-item.converter';
import { PeopleStrangerMergeListOptions } from './people-stranger-merge-manager.model';

@Injectable()
export class PeopleStrangerMergeListBusiness
  implements IBusiness<PagedList<Stranger>>
{
  constructor(
    private service: BusinessHallRequestService,
    private converter: PeopleStrangerListItemConverter,
    private store: StoreService
  ) {}

  async load(
    opts: PeopleStrangerMergeListOptions
  ): Promise<PagedList<Stranger>> {
    let paged = new PagedList<Stranger>();
    paged.Data = opts.datas;
    paged.Page = new Page();
    paged.Page.PageIndex = 1;
    paged.Page.PageSize = opts.datas.length;
    paged.Page.PageCount = opts.datas.length;
    paged.Page.RecordCount = opts.datas.length;
    paged.Page.TotalRecordCount = opts.datas.length;

    return paged;
  }
  getData(...args: any): Promise<PagedList<Stranger>> {
    throw new Error('Method not implemented.');
  }

  convert(data: Stranger) {
    return this.converter.convert(data);
  }

  async merge(main: Stranger, datas: Stranger[]) {
    let params = new MergeStrangerParams();
    params.StrangerId = main.Id;
    params.MergeIds = datas
      .filter((x) => !CompareTool.Id(x, main))
      .map((x) => x.Id);

    return this.service.stranger.merge(main.HallId, params);
  }
}

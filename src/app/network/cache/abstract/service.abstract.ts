import { IIdModel } from 'src/app/models/model.interface';
import { PagedList } from 'src/app/models/page.model';
import { IParams, PagedParams } from '../../request/IParams.interface';
import { IService } from '../interface/service.interface';
import { ServiceCache } from '../service.cache';

export abstract class AbstractService<T extends IIdModel>
  implements IService<T>
{
  abstract list(params?: IParams, ...args: any[]): Promise<PagedList<T>>;
  async all(params: PagedParams = new PagedParams()) {
    let data: T[] = [];
    let index = 1;
    let paged: PagedList<T>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
}

export interface AbstractService<T extends IIdModel> {
  cache: ServiceCache<T>;
}

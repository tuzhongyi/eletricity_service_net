import { IIdModel } from 'src/app/models/model.interface';
import { PagedList } from 'src/app/models/page.model';
import { IParams } from '../../request/IParams.interface';
import { ServiceCache } from '../service.cache';

export interface IService<T extends IIdModel> {
  cache: ServiceCache<T>;
  list: (params?: IParams, ...args: any[]) => Promise<PagedList<T>>;
  all: (params?: IParams, ...args: any[]) => Promise<T[]>;
  get?: (id: string, ...args: any[]) => Promise<T>;
}

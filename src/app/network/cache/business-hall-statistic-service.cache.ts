import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { PagedList } from 'src/app/models/page.model';
import { GetBusinessHallStatisticsParams } from '../request/business-hall/business-hall-request.params';
import { IService } from './interface/service.interface';
import { ServiceCache } from './service.cache';

export class BusinessHallStatisticServiceCache extends ServiceCache<BusinessHallStatistic> {
  constructor(key: string, service: IService<BusinessHallStatistic>) {
    super(key, service, BusinessHallStatistic, 1 * 20 * 1000, false);
  }

  item = {
    load: (id: string) => {
      return this.cache.get(this.key + id) as BusinessHallStatistic;
    },
    save: (id: string, data: BusinessHallStatistic) => {
      this.cache.set(this.key + id, data, this.timeout);
    },
  };

  override async list(
    args?: GetBusinessHallStatisticsParams
  ): Promise<PagedList<BusinessHallStatistic>> {
    try {
      if (args) {
        if (args.HallIds) {
          let result: BusinessHallStatistic[] = [];
          for (let i = 0; i < args.HallIds.length; i++) {
            const id = args.HallIds[i];
            let data = this.item.load(id);
            if (!data) {
              throw new Error();
            }
            result.push(data);
          }
          return this.paged.get(result, args);
        }
      }
    } catch (error) {}

    return this.service.list(args).then((result) => {
      result.Data.forEach((item) => {
        this.item.save(item.Id, item);
      });
      return result;
    });
  }

  override async all(
    params?: GetBusinessHallStatisticsParams
  ): Promise<BusinessHallStatistic[]> {
    this.loading = true;
    let datas = this.load();
    if (datas && datas.length > 0) {
      try {
        if (params) {
          return this.filter(datas, params);
        }
        return datas;
      } finally {
        this.loading = false;
      }
    }
    return this.service.list!(params).then((x) => {
      try {
        this.save(x.Data);
      } finally {
        this.loaded = true;
        this.loading = false;
      }
      return this.all(params);
    });
  }
}

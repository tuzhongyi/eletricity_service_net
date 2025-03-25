import { ClassConstructor } from 'class-transformer';
import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { BusinessHallStatisticServiceCache } from './business-hall-statistic-service.cache';
import { ServiceCache } from './service.cache';

export function Cache<T>(key: string, type?: ClassConstructor<T>) {
  return function (this: any, target: Function) {
    if (!target.prototype.cache) {
      Object.defineProperty(target.prototype, 'cache', {
        get() {
          if (!this._cache) {
            if (type) {
              switch (type.name) {
                case BusinessHallStatistic.name:
                  this._cache = new BusinessHallStatisticServiceCache(
                    key,
                    this
                  );
                  break;
                default:
                  this._cache = new ServiceCache(key, this);
                  break;
              }
            } else {
              this._cache = new ServiceCache(key, this);
            }
          }
          return this._cache;
        },
        set() {},
      });
    }
  };
}

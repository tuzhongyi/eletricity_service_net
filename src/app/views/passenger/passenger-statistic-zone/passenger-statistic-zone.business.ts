import { Injectable } from '@angular/core';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { Duration } from 'src/app/models/duration.model';
import { GetBusinessHallStatisticsParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

import { PassengerStatisticZoneConverter } from './passenger-statistic-zone.converter';

@Injectable()
export class PassengerStatisticZoneBusiness
  implements IBusiness<BusinessHallStatistic[], ITimeDataGroup<number>[]>
{
  constructor(
    public store: StoreService,
    private service: BusinessHallRequestService
  ) {}
  Converter:
    | IConverter<BusinessHallStatistic[], ITimeDataGroup<number>[]>
    | IPromiseConverter<BusinessHallStatistic[], ITimeDataGroup<number>[]> =
    new PassengerStatisticZoneConverter();

  async load(
    unit: TimeUnit,
    duration: Duration,
    hallId?: string
  ): Promise<ITimeDataGroup<number>[]> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    let data = await this.getData(hallId, unit, duration);
    let model = this.Converter.Convert(data, unit, duration.begin);
    return model;
  }
  async getData(
    hallId: string,
    unit: TimeUnit,
    duration: Duration
  ): Promise<BusinessHallStatistic[]> {
    let params = new GetBusinessHallStatisticsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    params.HallIds = [hallId];
    let paged = await this.service.statistic.list(params);
    return paged.Data;
  }
}

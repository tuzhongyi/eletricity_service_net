import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { CurrentBusinessHallStatistic } from 'src/app/models/current-business-hall-statistic.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeStatisticPassengerBusiness } from './realtime-statistic-passenger.business';
import { RealtimeStatisticConverter } from './realtime-statistic.converter';
import { RealtimeStatisticModel } from './realtime-statistic.model';

@Injectable()
export class RealtimeStatisticBusiness
  implements IBusiness<CurrentBusinessHallStatistic, RealtimeStatisticModel>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService,
    private passenger: RealtimeStatisticPassengerBusiness
  ) {}
  Converter: IConverter<CurrentBusinessHallStatistic, RealtimeStatisticModel> =
    new RealtimeStatisticConverter();
  loading?: EventEmitter<void> | undefined;
  async load(hallId?: string): Promise<RealtimeStatisticModel> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    let data = await this.getData(hallId);
    let passenger = await this.passenger.load(hallId);
    let model = this.Converter.Convert(data, passenger);
    return model;
  }
  getData(hallId: string): Promise<CurrentBusinessHallStatistic> {
    return this.service.statistic.current(hallId);
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Duration } from 'src/app/models/duration.model';
import { ItemModel } from 'src/app/models/item.model';
import { IModel } from 'src/app/models/model.interface';
import { PassengerFlow } from 'src/app/models/passenger-flow.model';
import { GetPassengerFlowsParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { StoreService } from 'src/app/tools/service/store.service';
import { PassengerStatisticConverter } from './passenger-statistic.converter';

@Injectable()
export class PassengerStatisticBusiness
  implements IBusiness<PassengerFlow[], ITimeDataGroup<number>[]>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}
  Converter: IConverter<PassengerFlow[], ITimeDataGroup<number>[]> =
    new PassengerStatisticConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    unit: TimeUnit,
    duration: Duration,
    hallId?: string
  ): Promise<ITimeDataGroup<number>[]> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    let data = await this.getData(hallId, unit, DurationParams.from(duration));
    let itmes: ItemModel[] = [
      {
        Id: '0',
        Name: '进客流',
      },
      {
        Id: '1',
        Name: '出客流',
      },
    ];
    let model = this.Converter.Convert(data, itmes);
    return model;
  }

  async getData(hallId: string, unit: TimeUnit, duration: DurationParams) {
    let params = new GetPassengerFlowsParams();
    params.HallIds = [hallId];
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    params.TimeUnit = unit;
    let paged = await this.service.passenger.list(params);
    return paged.Data;
  }
}

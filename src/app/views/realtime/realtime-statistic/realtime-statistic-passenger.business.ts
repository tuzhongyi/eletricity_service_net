import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class RealtimeStatisticPassengerBusiness
  implements IBusiness<CurrentDayPassengerFlow, CurrentDayPassengerFlow>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}

  Converter!: IConverter<CurrentDayPassengerFlow, CurrentDayPassengerFlow>;
  loading?: EventEmitter<void> | undefined;
  async load(hallId?: string): Promise<CurrentDayPassengerFlow> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    return this.getData(hallId);
  }

  getData(hallid: string): Promise<CurrentDayPassengerFlow> {
    return this.service.passenger.current(hallid);
  }
}

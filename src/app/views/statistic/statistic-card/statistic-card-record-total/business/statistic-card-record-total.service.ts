import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

export class StatisticCardRecordTotalService {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}
  async load() {
    let hall = await this.store.getBusinessHall();
    return this.service.statistic.current(hall.Id);
  }
}

import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { Duration } from 'src/app/models/duration.model';
import { GetPassengerFlowsParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

export class StatisticCardPassengerFlowService {
  constructor(private service: BusinessHallRequestService) {}

  async load(duration: Duration) {
    let params = new GetPassengerFlowsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    let paged = await this.service.passenger.list(params);
    return paged.Data;
  }
}

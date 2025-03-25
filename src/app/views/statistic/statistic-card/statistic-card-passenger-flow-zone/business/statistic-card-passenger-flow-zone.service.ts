import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { GetBusinessHallStatisticsParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class StatisticCardPassengerFlowZoneService {
  constructor(private service: BusinessHallRequestService) {}

  async load(hallId: string, begin: number) {
    let duration = DateTimeTool.allDay();
    duration.begin.setHours(begin);
    let params = new GetBusinessHallStatisticsParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    params.HallIds = [hallId];
    let paged = await this.service.statistic.list(params);
    return paged.Data;
  }
}

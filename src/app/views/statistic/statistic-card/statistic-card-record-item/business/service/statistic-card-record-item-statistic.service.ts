import { Injectable } from '@angular/core';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { GetBusinessHallStatisticsParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

@Injectable()
export class StatisticCardRecordItemStatisticService {
  constructor(private service: BusinessHallRequestService) {}
  load() {
    let duration = DateTimeTool.allDay();
    let params = new GetBusinessHallStatisticsParams();
    params.TimeUnit = TimeUnit.Hour;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return this.service.statistic.cache.all(params);
  }
}

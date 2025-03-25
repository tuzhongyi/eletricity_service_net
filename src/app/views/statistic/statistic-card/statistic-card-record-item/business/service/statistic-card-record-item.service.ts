import { Injectable } from '@angular/core';
import { StatisticCardRecordItemRecordService } from './statistic-card-record-item-record.service';
import { StatisticCardRecordItemStatisticService } from './statistic-card-record-item-statistic.service';

@Injectable()
export class StatisticCardRecordItemService {
  constructor(
    public statistic: StatisticCardRecordItemStatisticService,
    public record: StatisticCardRecordItemRecordService
  ) {}
}

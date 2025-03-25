import { Injectable } from '@angular/core';
import { StatisticRecordListController } from './statistic-record-list.controller';

@Injectable()
export class StatisticController {
  constructor(public recordlist: StatisticRecordListController) {}
}

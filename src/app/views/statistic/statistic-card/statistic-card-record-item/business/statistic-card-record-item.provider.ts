import { StatisticCardRecordItemRecordService } from './service/statistic-card-record-item-record.service';
import { StatisticCardRecordItemStatisticService } from './service/statistic-card-record-item-statistic.service';
import { StatisticCardRecordItemService } from './service/statistic-card-record-item.service';
import { StatisticCardRecordItemBusiness } from './statistic-card-record-item.business';

export const StatisticCardRecordItemProviders = [
  StatisticCardRecordItemRecordService,
  StatisticCardRecordItemStatisticService,
  StatisticCardRecordItemService,
  StatisticCardRecordItemBusiness,
];

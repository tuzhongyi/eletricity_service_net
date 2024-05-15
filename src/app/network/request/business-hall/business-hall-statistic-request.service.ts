import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { CurrentBusinessHallStatistic } from 'src/app/models/current-business-hall-statistic.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import { BaseRequestService } from '../base-request.service';
import { GetBusinessHallStatisticsParams } from './business-hall-request.params';

export class BusinessHallStatisticRequestService {
  constructor(private basic: BaseRequestService) {}
  current(hallId: string) {
    let url = BusinessHallsUrl.statistic(hallId).current();
    return this.basic.howellGet(url, CurrentBusinessHallStatistic);
  }
  list(params: GetBusinessHallStatisticsParams) {
    let url = BusinessHallsUrl.statistic().list();
    return this.basic.howellPaged(url, BusinessHallStatistic, params);
  }
}

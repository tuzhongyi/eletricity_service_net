import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { PagedList } from 'src/app/models/page.model';
import { PassengerFlow } from 'src/app/models/passenger-flow.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { GetPassengerFlowsParams } from './business-hall-request.params';

export class BusinessHallPassengerFlowRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(PassengerFlow);
  }
  type: BaseTypeRequestService<PassengerFlow>;

  current(hallId: string) {
    let url = BusinessHallsUrl.passengerFlow(hallId).current();
    return this.basic.howellGet(url, CurrentDayPassengerFlow);
  }

  list(params: GetPassengerFlowsParams) {
    let url = BusinessHallsUrl.passengerFlow().list();
    return this.type.paged(url, params);
  }
  async all(params = new GetPassengerFlowsParams()) {
    let data: PassengerFlow[] = [];
    let index = 1;
    let paged: PagedList<PassengerFlow>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }
}

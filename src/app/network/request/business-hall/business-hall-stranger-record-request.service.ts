import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { GetStrangerRecordsParams } from './business-hall-request.params';

export class BusinessHallStrangerRecordRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(StrangerRecord);
  }
  type: BaseTypeRequestService<StrangerRecord>;

  get(hallId: string, recordId: string) {
    let url = BusinessHallsUrl.stranger(hallId).record().item(recordId);
    return this.type.get(url);
  }

  list(hallId: string, params = new GetStrangerRecordsParams()) {
    let url = BusinessHallsUrl.stranger(hallId).record().list();
    return this.type.paged(url, params);
  }
}

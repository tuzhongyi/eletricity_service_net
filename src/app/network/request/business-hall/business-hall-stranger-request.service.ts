import { Stranger } from 'src/app/models/stranger.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import {
  GetStrangerParams,
  MergeStrangerParams,
} from './business-hall-request.params';
import { BusinessHallStrangerRecordRequestService } from './business-hall-stranger-record-request.service';

export class BusinessHallStrangerRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(Stranger);
  }
  private type: BaseTypeRequestService<Stranger>;

  get(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.stranger(hallId).item(cameraId);
    return this.type.get(url);
  }
  delete(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.stranger(hallId).item(cameraId);
    return this.type.delete(url);
  }
  update(data: Stranger) {
    let url = BusinessHallsUrl.stranger(data.HallId).item(data.Id);
    return this.type.put(url, data);
  }

  list(hallId: string, params: GetStrangerParams = new GetStrangerParams()) {
    let url = BusinessHallsUrl.stranger(hallId).list();
    return this.type.paged(url, params);
  }

  merge(hallId: string, params = new MergeStrangerParams()) {
    let url = BusinessHallsUrl.stranger(hallId).merge();
    return this.type.post(url, params);
  }

  private _record?: BusinessHallStrangerRecordRequestService;
  public get record(): BusinessHallStrangerRecordRequestService {
    if (!this._record) {
      this._record = new BusinessHallStrangerRecordRequestService(this.basic);
    }
    return this._record;
  }
}

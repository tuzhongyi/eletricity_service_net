import { instanceToPlain } from 'class-transformer';
import { HeatMap } from 'src/app/models/heat-map.model';
import { HowellResponse } from 'src/app/models/response.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { GetHeatMapParams } from './business-hall-request.params';

export class BusinessHallHeatMapRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(HeatMap);
  }
  type: BaseTypeRequestService<HeatMap>;
  async list(params: GetHeatMapParams) {
    let url = BusinessHallsUrl.heatMap();
    let plain = instanceToPlain(params);
    return this.basic
      .post<any, HowellResponse<HeatMap[]>>(url, plain)
      .then((x) => {
        return x.Data!;
      });
  }
}

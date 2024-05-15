import { HeatMap } from 'src/app/models/heat-map.model';
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
  list(params: GetHeatMapParams) {
    let url = BusinessHallsUrl.heatMap();
    return this.type.array(url, params);
  }
}

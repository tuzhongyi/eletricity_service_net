import { Base64 } from 'js-base64';
import { firstValueFrom } from 'rxjs';
import { Plan } from 'src/app/models/plan.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import { BaseRequestService } from '../base-request.service';
import { Medium } from '../medium/medium';

export class BusinessHallFloorPlanRequestService {
  constructor(private basic: BaseRequestService) {}

  async post(hallId: string, floorId: string, svg: string): Promise<Plan> {
    let code = encodeURIComponent(svg);
    let base64 = Base64.encode(code);
    let url = BusinessHallsUrl.floor(hallId).plan(floorId);
    return this.basic.base64(url, Plan, base64);
  }

  async get(id: string) {
    let url = Medium.data(id);
    let observable = this.basic.http.get(url, { responseType: 'text' });
    let result = await firstValueFrom(observable);
    return decodeURIComponent(result);
  }
}

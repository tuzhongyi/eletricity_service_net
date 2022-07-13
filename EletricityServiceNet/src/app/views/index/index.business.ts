import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

@Injectable()
export class IndexBusiness {
  constructor(private service: BusinessHallRequestService) {}

  async getHallList() {
    let paged = await this.service.list();
    return paged.Data;
  }
}

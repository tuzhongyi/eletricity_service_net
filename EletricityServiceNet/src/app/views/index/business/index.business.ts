import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class IndexBusiness {
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}

  async getHallList() {
    let paged = await this.service.list();
    return paged.Data;
  }

  async current(hallId?: string) {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    return this.service.passenger.current(hallId);
  }
}

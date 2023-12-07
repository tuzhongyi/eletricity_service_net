import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class SettingsServiceHallBusiness {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}

  async sync(hallId?: string) {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    this.service.syncCenterID(hallId);
  }
}

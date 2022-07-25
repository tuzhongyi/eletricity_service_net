import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class RecordBusiness {
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}

  async getFloors(hallId?: string) {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    return this.service.floor.array(hallId!);
  }
}
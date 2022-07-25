import { Injectable } from '@angular/core';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { Page } from 'src/app/models/page.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private service: BusinessHallRequestService) {}

  private hall?: BusinessHall;
  async getBusinessHall(): Promise<BusinessHall> {
    if (!this.hall) {
      let list = await this.service.list().catch(() => {
        let hall = new BusinessHall();
        hall.Id = '';
        hall.Name = '某某电力营业厅';
        return {
          Page: new Page(),
          Data: [hall],
        };
      });
      this.hall = list.Data[0];
    }
    return this.hall;
  }
}

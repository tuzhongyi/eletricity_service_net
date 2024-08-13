import { EventEmitter, Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { Page } from 'src/app/models/page.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private service: BusinessHallRequestService) {}
  private hall?: BusinessHall;

  track() {
    localStorage;
  }

  async getBusinessHall(): Promise<BusinessHall> {
    if (!this.hall) {
      let list = await this.service.list().catch(() => {
        let hall = new BusinessHall();
        hall.Id = '';
        hall.Name = '某某AI营业厅';
        return {
          Page: new Page(),
          Data: [hall],
        };
      });
      this.hall = list.Data[0];
    }
    return this.hall;
  }

  interval = new EventEmitter();
  private subscription?: Subscription;
  runInterval() {
    this.subscription = interval(1000 * 60).subscribe(() => {
      this.interval.emit();
    });
  }
  stopInterval() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clear() {
    this.hall = undefined;
    this.stopInterval();
    this.interval.unsubscribe();
    this.interval = new EventEmitter();
  }

  get isFullScreen() {
    return document.fullscreenElement && document.fullscreenElement !== null;
  }
}

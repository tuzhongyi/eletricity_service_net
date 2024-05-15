import { Injectable } from '@angular/core';
import { PassengerServerRequestService } from 'src/app/network/request/passenger/passenger-request.service';

@Injectable()
export class SettingsServicePassengerBusiness {
  constructor(private service: PassengerServerRequestService) {}

  sync(id: string) {
    return this.service.sync(id);
  }
  get() {
    return this.service.array();
  }
}

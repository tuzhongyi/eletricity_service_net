import { Injectable } from '@angular/core';
import { PassengerServer } from 'src/app/models/passenger-server.model';
import { PassengerServerRequestService } from 'src/app/network/request/passenger/passenger-request.service';

@Injectable()
export class SettingsServicePassengerServerBusiness {
  constructor(private service: PassengerServerRequestService) {}

  sync(id: string) {
    return this.service.sync(id);
  }

  async get() {
    try {
      let array = await this.service.array();
      if (array.length > 0) {
        return array[0];
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  update(data: PassengerServer) {
    return this.service.update(data);
  }
  create(data: PassengerServer) {
    return this.service.create(data);
  }
}

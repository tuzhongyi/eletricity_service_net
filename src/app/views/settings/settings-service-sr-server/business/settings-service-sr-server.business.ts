import { Injectable } from '@angular/core';
import { SRServer } from 'src/app/models/sr-server.model';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';

@Injectable()
export class SettingsServiceSRServerBusiness {
  constructor(private service: SRServerRequestService) {}

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

  update(data: SRServer) {
    return this.service.set(data);
  }
  create(data: SRServer) {
    return this.service.create(data);
  }
}

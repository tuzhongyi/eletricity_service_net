import { Injectable } from '@angular/core';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';

@Injectable()
export class SettingsServiceSRBusiness {
  constructor(private service: SRServerRequestService) {}

  sync(id: string) {
    return this.service.sync(id);
  }
  get() {
    return this.service.array();
  }
}

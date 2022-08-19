import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { PassengerServerRequestService } from 'src/app/network/request/passenger/passenger-request.service';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class SettingsServiceBusiness {
  constructor(
    private store: StoreService,
    private hallService: BusinessHallRequestService,
    private psService: PassengerServerRequestService,
    private srService: SRServerRequestService
  ) {}

  async syncCenterID(hallId?: string) {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    this.hallService.syncCenterID(hallId);
  }
  async syncPassengerServer(id: string) {
    this.psService.sync(id);
  }
  async syncSRServer(serverId: string) {
    this.srService.sync(serverId);
  }
  async getSRserver() {
    return await this.srService.array();
  }
  async getPassengerServer() {
    return this.psService.array();
  }
}

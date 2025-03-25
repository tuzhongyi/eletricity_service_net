import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

export class StatisticCardDeviceStateService {
  constructor(private service: BusinessHallRequestService) {}

  load() {
    return this.service.camera.all();
  }
}

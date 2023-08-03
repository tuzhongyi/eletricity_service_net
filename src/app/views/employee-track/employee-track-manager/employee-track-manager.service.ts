import { Injectable } from '@angular/core';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';

@Injectable()
export class EmployeeTrackManagerService {
  constructor(
    public sr: SRServerRequestService,
    public config: ConfigRequestService
  ) {}
}

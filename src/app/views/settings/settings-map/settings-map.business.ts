import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';

@Injectable()
export class SettingsMapBusiness {
  constructor(private service: BusinessHallRequestService) {}

  getBase64(url: string) {
    let observable = this.service.basic.http.get(url, { responseType: 'text' });
    return firstValueFrom(observable);
  }
}

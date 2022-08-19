import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PassengerServer } from 'src/app/models/passenger-server.model';
import { PassengerServerUrl } from '../../url/businesshall_service/passenger-server.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';

@Injectable({
  providedIn: 'root',
})
export class PassengerServerRequestService {
  private type: BaseTypeRequestService<PassengerServer>;

  constructor(private http: HttpClient) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(PassengerServer);
  }
  private basic: BaseRequestService;

  array() {
    let url = PassengerServerUrl.basic();
    return this.type.array(url);
  }
  create(model: PassengerServer) {
    let url = PassengerServerUrl.basic();
    return this.type.post(url, model);
  }
  get(id: string) {
    let url = PassengerServerUrl.item(id);
    return this.type.get(url);
  }
  update(model: PassengerServer) {
    let url = PassengerServerUrl.item(model.Id);
    return this.type.put(url, model);
  }
  delete(id: string) {
    let url = PassengerServerUrl.item(id);
    return this.type.delete(url);
  }
  sync(id: string) {
    let url = PassengerServerUrl.sync(id);
    let observable = this.http.post(url, undefined);
    return firstValueFrom(observable);
  }
}

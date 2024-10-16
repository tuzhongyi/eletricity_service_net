import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventType } from 'src/app/enums/event-type.enum';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { EventRecord } from 'src/app/models/event-record.model';
import { StoreService } from 'src/app/tools/service/store.service';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';
import { MqttClient } from './mqtt.client';
import { MqttConfig } from './mqtt.model';

@Injectable({
  providedIn: 'root',
})
export class MqttRequestService {
  event = new EventEmitter<EventRecord>();

  constructor(private http: HttpClient, private store: StoreService) {
    this.init();
  }

  get config() {
    let url = UrlTool.get('/assets/configs/config-mqtt.json');
    return firstValueFrom(this.http.get<MqttConfig>(url));
  }

  private async init() {
    let config = await this.config;
    let client = new MqttClient(config.host, config.port);
    console.log(`mqtt connect to ${config.host}:${config.port}`);
    let hall = await this.store.getBusinessHall();
    if (config.trigger) {
      this.subscrib(client, hall, config.trigger.eventtypes);
    }
  }

  private subscrib(
    client: MqttClient,
    hall: BusinessHall,
    types: EventType[] = []
  ) {
    types.forEach((type) => {
      client.subscribe(
        `BusinessHalls/${hall.Id}/Events/${type}`,
        async (data: EventRecord) => {
          this.event.emit(data);
        },
        EventRecord
      );
    });
  }
}

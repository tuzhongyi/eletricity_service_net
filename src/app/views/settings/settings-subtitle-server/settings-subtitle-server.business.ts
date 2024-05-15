import { Injectable } from '@angular/core';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class SettingsSubtitleServerBusiness {
  constructor(
    private service: SubtitlingRequestService,
    private medium: Medium,
    private store: StoreService
  ) {}

  private _server?: SubtitlingServer;

  async create(model: SubtitlingServer) {
    return this.service.server.create(model);
  }

  async get() {
    if (!this._server) {
      let array = await this.service.server.array();
      if (array && array.length > 0) {
        this._server = array[0];
      }
    }
    return this._server;
  }

  update(model: SubtitlingServer) {
    return this.service.server.update(model);
  }

  // sync(){

  //   return this.service.server.sync.from.business()
  // }
}

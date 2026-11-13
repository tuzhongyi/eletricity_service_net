import { Injectable } from '@angular/core';
import { AnalysisServer } from 'src/app/models/analysis-server.model';
import { AudioSource } from 'src/app/models/audio-source.model';
import { AnalysisServerRequestService } from 'src/app/network/request/analysis/analysis-request.service';

@Injectable()
export class SettingsServiceAnalysisServerBusiness {
  constructor(private service: AnalysisServerRequestService) {}

  sync(id: string) {
    return this.service.sync(id);
  }
  async get() {
    try {
      let array = await this.service.array();
      if (array && array.length > 0) {
        return array[0];
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  update(data: AnalysisServer) {
    return this.service.update(data);
  }
  create(data: AnalysisServer) {
    return this.service.create(data);
  }

  audio = {
    array: (serverId: string) => this.service.audio.array(serverId),
    create: (serverId: string, data: AudioSource) => {
      data.Id = '';
      data.CreateTime = new Date();
      data.UpdateTime = new Date();
      return this.service.audio.create(serverId, data);
    },
    update: (serverId: string, data: AudioSource) => {
      data.UpdateTime = new Date();
      return this.service.audio.update(serverId, data);
    },
  };
}

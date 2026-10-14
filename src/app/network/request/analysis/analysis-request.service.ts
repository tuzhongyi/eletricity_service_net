import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AnalysisServer } from 'src/app/models/analysis-server.model';
import { AudioSource } from 'src/app/models/audio-source.model';
import { AnalysisServerUrl } from '../../url/businesshall_service/analysis-server.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';

@Injectable({
  providedIn: 'root',
})
export class AnalysisServerRequestService {
  private type: BaseTypeRequestService<AnalysisServer>;

  constructor(private http: HttpClient) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(AnalysisServer);
  }
  private basic: BaseRequestService;

  array() {
    let url = AnalysisServerUrl.basic();
    return this.type.array(url);
  }
  create(model: AnalysisServer) {
    let url = AnalysisServerUrl.basic();
    return this.type.post(url, model);
  }
  get(id: string) {
    let url = AnalysisServerUrl.item(id);
    return this.type.get(url);
  }
  update(model: AnalysisServer) {
    let url = AnalysisServerUrl.item(model.Id);
    return this.type.put(url, model);
  }
  delete(id: string) {
    let url = AnalysisServerUrl.item(id);
    return this.type.delete(url);
  }
  sync(id: string) {
    let url = AnalysisServerUrl.sync(id);
    let observable = this.http.post(url, undefined);
    return firstValueFrom(observable);
  }

  private _audio?: AnalysisServerAudioSourcesRequestService;
  public get audio(): AnalysisServerAudioSourcesRequestService {
    if (!this._audio) {
      this._audio = new AnalysisServerAudioSourcesRequestService(
        this.basic,
        this,
      );
    }
    return this._audio;
  }
}
class AnalysisServerAudioSourcesRequestService {
  private type: BaseTypeRequestService<AudioSource>;
  constructor(
    basic: BaseRequestService,
    private server: AnalysisServerRequestService,
  ) {
    this.type = basic.type(AudioSource);
  }
  array(serverId: string) {
    let url = AnalysisServerUrl.audio(serverId).basic();
    return this.type.array(url);
  }
  create(serverId: string, model: AudioSource) {
    let url = AnalysisServerUrl.audio(serverId).basic();
    return this.type.post(url, model);
  }
  get(serverId: string, id: string) {
    let url = AnalysisServerUrl.audio(serverId).item(id);
    return this.type.get(url);
  }
  update(serverId: string, model: AudioSource) {
    let url = AnalysisServerUrl.audio(serverId).item(model.Id);
    return this.type.put(url, model);
  }
  delete(serverId: string, id: string) {
    let url = AnalysisServerUrl.audio(serverId).item(id);
    return this.type.delete(url);
  }

  async all() {
    let servers = await this.server.array();
    let promise = servers.map((x) => this.array(x.Id));
    let all = await Promise.all(promise);
    return all.flat(1);
  }
}

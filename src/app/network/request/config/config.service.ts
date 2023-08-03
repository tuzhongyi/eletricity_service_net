import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Config, TrackConfig } from 'src/app/models/config';

enum ConfigKey {
  track = 'track',
}

@Injectable({
  providedIn: 'root',
})
export class ConfigRequestService {
  constructor(private http: HttpClient) {}

  get(): Promise<Config> {
    let protocol = location.protocol;
    if (!protocol.includes(':')) {
      protocol += ':';
    }
    let port = '';
    if (location.port) {
      port = ':' + location.port;
    }
    let url = `${protocol}//${location.hostname}${port}/assets/configs/config.json`;
    return firstValueFrom(this.http.get<Config>(url));
  }

  private _track?: TrackConfigRequestService;
  public get track(): TrackConfigRequestService {
    if (!this._track) {
      this._track = new TrackConfigRequestService(this);
    }
    return this._track;
  }
}

class TrackConfigRequestService {
  constructor(private service: ConfigRequestService) {}
  async get(): Promise<TrackConfig> {
    try {
      let str = localStorage.getItem(ConfigKey.track);
      if (str) {
        return JSON.parse(str);
      }
    } catch (error) {}
    let config = await this.service.get();
    this.set(config.track);
    return config.track;
  }
  set(track: TrackConfig) {
    let str = JSON.stringify(track);
    localStorage.setItem(ConfigKey.track, str);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Config, TrackConfig } from 'src/app/models/config/config';
import { StatisticConfig } from 'src/app/models/config/config-statistic';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';

enum ConfigKey {
  track = 'track',
  statistic = 'statistic',
}

@Injectable({
  providedIn: 'root',
})
export class ConfigRequestService {
  constructor(private http: HttpClient) {}

  test = {
    subtitle: () => {
      let url = UrlTool.get('/assets/test/0.srt');
      return firstValueFrom(this.http.get(url, { responseType: 'text' }));
    },
  };

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

  private _statistic?: StatisticConfigRequestService;
  public get statistic(): StatisticConfigRequestService {
    if (!this._statistic) {
      this._statistic = new StatisticConfigRequestService(this.http);
    }
    return this._statistic;
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

class StatisticConfigRequestService {
  constructor(private http: HttpClient) {}

  private _get(): Promise<StatisticConfig> {
    let protocol = location.protocol;
    if (!protocol.includes(':')) {
      protocol += ':';
    }
    let port = '';
    if (location.port) {
      port = ':' + location.port;
    }
    let url = `${protocol}//${location.hostname}${port}/assets/configs/config-statistic.json`;
    return firstValueFrom(this.http.get<StatisticConfig>(url));
  }

  async get(): Promise<StatisticConfig> {
    let config = await this._get();
    return config;
  }
}

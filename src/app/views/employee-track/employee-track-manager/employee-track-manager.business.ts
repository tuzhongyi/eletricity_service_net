import { Injectable } from '@angular/core';
import { TrackConfig } from 'src/app/models/config';
import { VideoModel } from 'src/app/models/video.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { EmployeesTableBusiness } from '../../tables/employees-table/employees-table.business';
import { EmployeeTrackManagerService } from './employee-track-manager.service';

@Injectable()
export class EmployeeTrackManagerBusiness {
  constructor(
    public employee: EmployeesTableBusiness,
    private service: EmployeeTrackManagerService
  ) {}

  getConfig() {
    return this.service.config.track.get();
  }
  setConfig(config: TrackConfig) {
    this.service.config.track.set(config);
  }

  async playback(cameraId: string, time: Date) {
    let config = await this.getConfig();
    let duration = DateTimeTool.beforeDuration(
      time,
      config.begin,
      config.duration
    );
    let url = await this.service.sr.playback(cameraId, {
      BeginTime: duration.begin,
      EndTime: duration.end,
    });
    let model = VideoModel.fromUrl(url.Url);
    if (url.Username) model.username = url.Username;
    if (url.Password) model.password = url.Password;
    return model;
  }
}

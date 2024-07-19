import { Injectable } from '@angular/core';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { SettingsSubtitleChannelScheduleConverter } from './settings-subtitle-channel-schedule.converter';
import { SettingsSubtitleChannelScheduleCreater as Creater } from './settings-subtitle-channel-schedule.creater';
import {
  SettingsSubtitleChannelScheduleArgs,
  WeekTimeSegmentModel,
} from './settings-subtitle-channel-schedule.model';

@Injectable()
export class SettingsSubtitleChannelScheduleBusiness {
  constructor(private service: SubtitlingRequestService) {}

  private converter = new SettingsSubtitleChannelScheduleConverter();

  async load(args: SettingsSubtitleChannelScheduleArgs) {
    return new Promise<WeekTimeSegmentModel>((resolve) => {
      this.loadData(args.serverId, args.channelId)
        .then((data) => {
          let model = this.converter.model.from(data);
          resolve(model);
        })
        .catch((x) => {
          let model = Creater.WeekTimeSegmentModel();
          resolve(model);
        });
    });
  }

  update(
    args: SettingsSubtitleChannelScheduleArgs,
    model: WeekTimeSegmentModel
  ) {
    let data = this.converter.model.to(model);
    return this.service.server.channel.schedule.update(
      args.serverId,
      args.channelId,
      data
    );
  }

  private loadData(serverId: string, channelId: string) {
    return this.service.server.channel.schedule.get(serverId, channelId);
  }
}

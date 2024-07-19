import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';

import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/tools/language';
import { SettingsSubtitleChannelScheduleBusiness } from './settings-subtitle-channel-schedule.business';
import { SettingsSubtitleChannelScheduleCreater as Creater } from './settings-subtitle-channel-schedule.creater';
import {
  DayTimeSegmentModel,
  SettingsSubtitleChannelScheduleArgs,
  SettingsSubtitleChannelScheduleWindow,
  WeekTimeSegmentModel,
} from './settings-subtitle-channel-schedule.model';

@Component({
  selector: 'howell-settings-subtitle-channel-schedule',
  templateUrl: './settings-subtitle-channel-schedule.component.html',
  styleUrls: ['./settings-subtitle-channel-schedule.component.less'],
  providers: [SettingsSubtitleChannelScheduleBusiness],
})
export class SettingsSubtitleChannelScheduleComponent implements OnInit {
  @Input() channel?: SubtitlingChannel;
  @Output() close = new EventEmitter<boolean>();
  constructor(
    private business: SettingsSubtitleChannelScheduleBusiness,
    private toastr: ToastrService
  ) {}

  private get args() {
    if (!this.channel) return undefined;
    let args: SettingsSubtitleChannelScheduleArgs = {
      serverId: this.channel.ServerId,
      channelId: this.channel.Id,
    };
    return args;
  }
  data?: WeekTimeSegmentModel;
  week: number = 0;
  weeks = [0, 1, 2, 3, 4, 5, 6];
  Language = Language;
  window = new SettingsSubtitleChannelScheduleWindow();

  ngOnInit(): void {
    this.load();
  }

  load() {
    if (this.args) {
      this.business.load(this.args).then((x) => {
        this.data = x;
      });
    }
  }

  onadd() {
    if (this.data) {
      let week = this.data.Days[this.week];
      if (!week.Segments) {
        week.Segments = [Creater.Segment()];
      } else {
        week.Segments.push(Creater.Segment());
      }
    }
  }

  onremove(index: number) {
    if (this.data) {
      let week = this.data.Days[this.week];
      if (!week.Segments) {
        week.Segments = [Creater.Segment()];
      } else {
        if (week.Segments.length === 1) {
          week.Segments[index] = Creater.Segment();
        } else {
          week.Segments.splice(index, 1);
        }
      }
    }
  }

  oncopy() {
    if (!this.data) return;
    this.window.copy.day = this.data.Days.find(
      (x) => x.DayOfWeek === this.week
    );
    this.window.copy.show = true;
  }

  docopy(datas: DayTimeSegmentModel[]) {
    if (!this.data) return;
    let days = datas.map((x) => x.DayOfWeek);
    for (let i = 0; i < this.data.Days.length; i++) {
      const day = this.data.Days[i];
      if (days.includes(day.DayOfWeek)) {
        this.data.Days.splice(i, 1);
        i--;
      }
    }
    this.data.Days.push(...datas);
    this.data.Days = this.data.Days.sort((a, b) => a.DayOfWeek - b.DayOfWeek);

    this.window.copy.show = false;
    this.toastr.success('复制成功');
  }

  onok() {
    if (this.args && this.data) {
      this.business
        .update(this.args, this.data)
        .then((x) => {
          this.close.emit(true);
        })
        .catch((x) => {
          console.error(x);
        });
    }
  }
  oncancel() {
    this.close.emit(false);
  }
}

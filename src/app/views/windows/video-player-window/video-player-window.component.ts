import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  TimeDurationModel,
  TimeModel,
} from 'src/app/components/time-control/time-control.model';
import { WindowComponent } from 'src/app/components/window-control/window.component';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';

import { IModel } from 'src/app/models/model.interface';
import { VideoModel } from 'src/app/models/video.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { VideoPlayerWindowBusiness } from './video-player-window.business';

@Component({
  selector: 'howell-video-player-window',
  templateUrl: './video-player-window.component.html',
  styleUrls: ['./video-player-window.component.less'],
  providers: [VideoPlayerWindowBusiness],
})
export class VideoPlayerWindowComponent
  extends WindowComponent
  implements IComponent<IModel, VideoModel>, OnInit, OnChanges, OnDestroy
{
  @Input()
  business: IBusiness<IModel, VideoModel>;
  @Input()
  cameraId?: string;
  @Input()
  mode: PlayMode = PlayMode.live;
  @Input()
  time?: Date;
  @Input()
  autoplay: boolean = false;

  constructor(business: VideoPlayerWindowBusiness) {
    super();
    this.business = business;
    let duration = DateTimeTool.beforeAndAfter(this.date, 15);
    this.duration = new TimeDurationModel(duration.begin, duration.end);
  }
  ngOnDestroy(): void {
    this.data = undefined;
  }

  PlayMode = PlayMode;
  date: Date = new Date();
  duration: TimeDurationModel;
  data?: VideoModel;
  DateTimePickerView = DateTimePickerView;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.time) {
      this.date = this.time;
      let duration = DateTimeTool.beforeAndAfter(this.time, 30);
      this.duration = {
        begin: new TimeModel(duration.begin),
        end: new TimeModel(duration.end),
      };
    }
    if (this.mode === PlayMode.live) {
      this.autoplay = true;
    }
    if (this.autoplay) {
      this.loadData();
    }
  }

  async loadData() {
    if (this.cameraId) {
      if (this.mode == PlayMode.live) {
        this.preview();
      } else {
        this.playback();
      }
    }
  }
  changeDate(date: Date) {
    this.date = date;
  }
  async preview() {
    this.data = await this.business.load(this.cameraId, this.mode);
  }

  async playback() {
    let duration = {
      begin: this.duration.begin.toDate(this.date),
      end: this.duration.end.toDate(this.date),
    };
    this.data = await this.business.load(this.cameraId, this.mode, duration);
  }
}

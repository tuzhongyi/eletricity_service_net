import {
  Component,
  EventEmitter,
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
  @Input() business: IBusiness<IModel, VideoModel>;
  @Input() cameraId?: string;
  @Input() mode: PlayMode = PlayMode.live;
  @Input() begin?: Date;
  @Input() end?: Date;
  @Input() autoplay: boolean = false;
  @Input() subtitle = false;

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
  stop: EventEmitter<void> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if ('begin' in changes) {
      if (this.begin) {
        this.duration.begin = new TimeModel(this.begin);
        this.date = this.begin;
      }
    }
    if ('end' in changes) {
      this.duration.end = new TimeModel(this.end);
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
  changeMode(mode: PlayMode) {
    this.mode = mode;
    if (mode == PlayMode.live) {
      this.preview();
    } else {
      this.stop.emit();
      let duration = DateTimeTool.beforeAndAfter(this.date, 15);
      this.duration = new TimeDurationModel(duration.begin, duration.end);
    }
  }
  async preview() {
    this.mode = PlayMode.live;
    this.data = await this.business.load(this.cameraId, this.mode);
  }
  webUrl?: string;
  async playback() {
    this.mode = PlayMode.vod;
    let duration = {
      begin: this.duration.begin.toDate(this.date),
      end: this.duration.end.toDate(this.date),
    };
    this.data = await this.business.load(this.cameraId, this.mode, duration);
  }
}

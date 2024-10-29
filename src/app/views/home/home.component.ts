import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import { StreamType } from 'src/app/enums/stream-type.enum';
import {
  HowellPreviewArgs,
  HowellVideoPlayerArgs,
} from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record.model';
import { Language } from 'src/app/tools/language';
import { HomeAlarmWindow, HomeWindow } from './home.model';

@Component({
  selector: 'howell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [HomeWindow, HomeAlarmWindow],
})
export class HomeComponent implements OnInit {
  @Output() preview: EventEmitter<VideoArgs> = new EventEmitter();
  @Output() playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output() picture: EventEmitter<PictureArgs> = new EventEmitter();

  constructor(public window: HomeWindow) {}

  device: number = 0;
  screen = {
    mode: ScreenMode.nine,
    index: 0,
  };
  play: EventEmitter<HowellVideoPlayerArgs> = new EventEmitter();
  ScreenMode = ScreenMode;

  ngOnInit(): void {}

  onPlayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  onPreview(args: VideoArgs) {
    let _args = new HowellPreviewArgs();
    _args.cameraId = args.cameraId;
    _args.stream = StreamType.sub;
    this.play.emit(_args);
  }
  onPicture(args: PictureArgs) {
    this.picture.emit(args);
  }

  onTrigger(data: EventRecord) {
    if (this.window.alarm.show) {
      this.window.alarm.show = false;
    }
    setTimeout(() => {
      console.log('窗口弹出');
      this.window.alarm.data = data;
      this.window.alarm.name = Language.EventType(data.EventType);
      this.window.alarm.show = true;
    }, 10);
  }
  screenModeChange(mode: ScreenMode) {
    this.screen.mode = mode;
  }
  fullScreen() {
    let video = document.querySelector(
      '.howell-video-player-list'
    ) as HTMLDivElement;
    this.launchFullscreen(video);
  }
  launchFullscreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
}

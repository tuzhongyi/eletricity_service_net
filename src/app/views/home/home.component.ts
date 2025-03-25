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

import { PlayMode } from 'src/app/enums/play-mode.enum';
import { Medium } from 'src/app/network/request/medium/medium';
import { HomeAlarmWindow } from './controller/home-alarm-window.controller';
import { HomeWindow } from './controller/home-window.controller';

@Component({
  selector: 'howell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [HomeWindow, HomeAlarmWindow],
})
export class HomeComponent implements OnInit {
  @Output() preview: EventEmitter<VideoArgs> = new EventEmitter();

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
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;

    this.window.video.begin = args.begin;
    this.window.video.end = args.end;
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }
  onPreview(args: VideoArgs) {
    let _args = new HowellPreviewArgs();
    _args.cameraId = args.cameraId;
    _args.stream = StreamType.sub;
    this.play.emit(_args);
  }
  async onPicture(args: PictureArgs) {
    this.window.picture.title = args.title;
    let result = await Medium.img(args.id);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;

    this.window.picture.show = true;
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

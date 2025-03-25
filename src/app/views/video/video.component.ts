import { Component, EventEmitter, OnInit } from '@angular/core';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import { HowellVideoPlayerArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Camera } from 'src/app/models/camera.model';
import { StoreService } from 'src/app/tools/service/store.service';
import { VideoWindow } from './video-window';
import { VideoNavigation } from './video.component.model';

@Component({
  selector: 'howell-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
  providers: [VideoWindow],
})
export class VideoComponent implements OnInit {
  constructor(private store: StoreService, public window: VideoWindow) {}

  hallId?: string;

  mode: PlayMode = PlayMode.live;
  screen = {
    mode: ScreenMode.one,
    index: 0,
  };
  play: EventEmitter<HowellVideoPlayerArgs> = new EventEmitter();
  selected?: Camera;
  navigation = VideoNavigation.preview;

  Navigation = VideoNavigation;
  PlayMode = PlayMode;
  ScreenMode = ScreenMode;

  async ngOnInit() {
    let hall = await this.store.getBusinessHall();
    this.hallId = hall.Id;
  }

  onnavigation(navigation: VideoNavigation) {
    this.navigation = navigation;
    switch (navigation) {
      case VideoNavigation.preview:
        this.mode = PlayMode.live;
        break;
      case VideoNavigation.playback:
        this.mode = PlayMode.vod;
        break;
      case VideoNavigation.keyword:
        this.mode = PlayMode.vod;
        this.screen.mode = ScreenMode.one;
        break;
      default:
        break;
    }
  }
  screenModeChange(mode: ScreenMode) {
    this.screen.mode = mode;
  }

  launchFullscreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
  fullScreen() {
    let video = document.querySelector(
      '.howell-video-player-list'
    ) as HTMLDivElement;
    this.launchFullscreen(video);
  }

  onplay(args: HowellVideoPlayerArgs) {
    this.play.emit(args);
  }

  onplaywindow(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.cameraId;
    if (args.begin) {
      this.window.video.begin = new Date(args.begin.getTime());
      this.window.video.begin.setSeconds(
        this.window.video.begin.getSeconds() - 30
      );
    }
    if (args.end) {
      this.window.video.end = new Date(args.end.getTime());
      this.window.video.end.setSeconds(this.window.video.end.getSeconds() + 30);
    }
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }
}

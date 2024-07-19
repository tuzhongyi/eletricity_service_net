import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import { HowellVideoPlayerArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Camera } from 'src/app/models/camera.model';
import { StoreService } from 'src/app/tools/service/store.service';
import { VideoNavigation } from './video.component.model';

@Component({
  selector: 'howell-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
})
export class VideoComponent implements OnInit {
  @Output() playback: EventEmitter<VideoArgs> = new EventEmitter();
  constructor(private store: StoreService) {}

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
    this.playback.emit(args);
  }
}

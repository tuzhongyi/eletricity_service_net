import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
  PlaybackInterval,
} from 'src/app/components/image-video-control/image-video-control.model';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import { Camera } from 'src/app/models/camera.model';
import { Duration } from 'src/app/models/duration.model';
import { VideoModel } from 'src/app/models/video.model';
import { VideoBusiness } from './video.business';

@Component({
  selector: 'howell-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
  providers: [VideoBusiness],
})
export class VideoComponent implements OnInit {
  constructor(private business: VideoBusiness) {}

  mode: PlayMode = PlayMode.live;
  PlayMode = PlayMode;
  ScreenMode = ScreenMode;
  screen: ScreenMode = ScreenMode.one;
  play: EventEmitter<VideoModel> = new EventEmitter();
  selected?: Camera;

  ngOnInit(): void {}

  playModeChange(mode: PlayMode) {
    this.mode = mode;
  }
  screenModeChange(mode: ScreenMode) {
    this.screen = mode;
  }
  async onCameraSelect(item: Camera) {
    this.selected = item;

    if (this.mode === PlayMode.live) {
      let url = await this.business.getUrl(item.Id, this.mode);
      let model = new VideoModel(url.Url);
      this.play.emit(model);
    }
  }

  async onPlayback(duration: Duration) {
    if (!this.selected) return;
    let url = await this.business.getUrl(this.selected.Id, this.mode, duration);
    let model = new VideoModel(url.Url);
    this.play.emit(model);
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
}

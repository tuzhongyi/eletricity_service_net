import { EventEmitter } from '@angular/core';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import {
  HowellPlaybackArgs,
  HowellVideoPlayerArgs,
} from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { wait } from 'src/app/tools/tools';

export class VideoKeywordsVideoController {
  screen = {
    mode: ScreenMode.one,
    index: 0,
  };

  toplay = new EventEmitter<HowellVideoPlayerArgs>();
  toseek = new EventEmitter<number>();
  opensubtitle = new EventEmitter<boolean>();

  playingmap: Map<number, boolean> = new Map();

  get isplaying() {
    if (this.playingmap.has(this.screen.index)) {
      return this.playingmap.get(this.screen.index) ?? false;
    }
    return false;
  }
  set isplaying(value: boolean) {
    if (this.playingmap.has(this.screen.index)) {
      this.playingmap.set(this.screen.index, value);
    }
  }

  play(model: HowellPlaybackArgs) {
    this.opensubtitle.emit(true);
    this.toplay.emit(model);
  }
  playing(index: number) {
    this.playingmap.set(index, true);
  }
  stoping(index: number) {
    this.playingmap.set(index, false);
  }
  seek(position: number) {
    wait(
      () => {
        return this.isplaying;
      },
      () => {
        this.toseek.emit(position);
      }
    );
  }
}

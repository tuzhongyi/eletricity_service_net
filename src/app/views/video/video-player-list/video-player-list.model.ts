import { EventEmitter } from '@angular/core';
import {
  HowellPlaybackArgs,
  HowellPreviewArgs,
  HowellSubtitlingArgs,
  HowellVideoPlayerArgs,
} from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { VideoModel } from 'src/app/models/video.model';

export interface IndexArgs<T> {
  index: number;
  data: T;
}
export class VideoPlayerListEvent {
  seeks: EventEmitter<number>[] = [];
  plays: EventEmitter<VideoModel>[] = [];
}

export class VideoPlayerListItem {
  constructor(index: number) {
    this.index = index;
  }
  index: number;
  seek = new EventEmitter<number>();
  selected = false;
  event = {
    preview: new EventEmitter<HowellPreviewArgs>(),
    playback: new EventEmitter<HowellPlaybackArgs>(),
    stop: new EventEmitter(),
    subtitling: new EventEmitter<HowellSubtitlingArgs>(),
  };

  playing = false;

  private args?: HowellVideoPlayerArgs;

  resume() {
    if (this.args) {
      if (this.args instanceof HowellPreviewArgs) {
        this.preview(this.args);
      } else if (this.args instanceof HowellPlaybackArgs) {
        this.playback(this.args);
      } else {
      }
    }
  }

  preview(args: HowellPreviewArgs) {
    this.event.preview.emit(args);
    this.playing = true;
  }
  playback(args: HowellPlaybackArgs) {
    this.event.playback.emit(args);
    this.playing = true;
  }
  subtitling(args: HowellSubtitlingArgs) {
    this.event.subtitling.emit(args);
    this.playing = true;
  }

  stop() {
    this.event.stop.emit();
    this.playing = false;
  }
}

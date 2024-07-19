import { EventEmitter } from '@angular/core';
import {
  HowellPlaybackArgs,
  HowellPreviewArgs,
} from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { ImageControlModel } from 'src/app/models/image-control.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';

export class ImageVideoControlModel {
  constructor(stationId: string, cameraId: string) {
    this.stationId = stationId;
    this.cameraId = cameraId;
  }
  fulled = false;
  cameraId: string;
  stationId: string;
  image?: ImageControlModel;

  event = {
    preview: new EventEmitter<HowellPreviewArgs>(),
    playback: new EventEmitter<HowellPlaybackArgs>(),
    stop: new EventEmitter<void>(),
  };

  private _playing = false;
  public get playing(): boolean {
    return this._playing;
  }

  preview(cameraId: string) {
    let args = new HowellPreviewArgs();
    args.cameraId = cameraId;
    this.event.preview.emit(args);
    this._playing = true;
  }
  playback(cameraId: string, begin: Date, end: Date) {
    let args = new HowellPlaybackArgs();
    args.cameraId = cameraId;

    args.duration = { begin, end };
    this.event.playback.emit(args);
    this._playing = true;
  }
  stop() {
    this.event.stop.emit();
    this._playing = false;
  }
}

export class ImageVideoControlOperation {
  play = true;
  fullscreen = true;
}

export class PlaybackInterval extends DurationParams {
  CameraId!: string;
}

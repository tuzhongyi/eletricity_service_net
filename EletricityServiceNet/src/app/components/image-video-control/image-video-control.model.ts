import { ImageControlModel } from 'src/app/models/image-control.model';
import { VideoModel } from 'src/app/models/video.model';
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

  private _video?: VideoModel;
  public get video(): VideoModel | undefined {
    return this._video;
  }
  public set video(v: VideoModel | undefined) {
    this._video = v;
    if (this.videoChanged) {
      this.videoChanged(this._video);
    }
  }
  videoChanged?: (video?: VideoModel) => void;
}

export class ImageVideoControlOperation {
  play = true;
  fullscreen = true;
}

export class PlaybackInterval extends DurationParams {
  CameraId!: string;
}

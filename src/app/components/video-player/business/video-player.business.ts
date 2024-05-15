import { Injectable } from '@angular/core';
import { VideoPlayerSubtitleBusiness } from './video-player-subtitle.business';

@Injectable()
export class VideoPlayerBusiness {
  constructor(public subtitle: VideoPlayerSubtitleBusiness) {}
}

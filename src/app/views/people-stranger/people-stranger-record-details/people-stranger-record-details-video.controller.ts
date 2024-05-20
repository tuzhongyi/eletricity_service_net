import { EventEmitter } from '@angular/core';
import { VideoUrl } from 'src/app/models/video-url.model';
import { VideoModel } from 'src/app/models/video.model';

export class PeopleStrangerRecordDetailsVideoController {
  toplay = new EventEmitter<VideoModel>();
  show = false;
  name = '';

  model?: VideoModel;

  onstop() {
    this.show = false;
  }

  play(url: VideoUrl) {
    this.model = new VideoModel(url.Url);
    // if (url.Username) {
    //   model.username = url.Username;
    // }
    // if (url.Password) {
    //   model.password = url.Password;
    // }
    // this.toplay.emit(model);
  }
}

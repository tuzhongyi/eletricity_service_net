import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
  PlaybackInterval,
} from 'src/app/components/image-video-control/image-video-control.model';

@Component({
  selector: 'howell-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.less'],
})
export class VideoComponent implements OnInit {
  constructor() {}
  playing?: ImageVideoControlModel;
  model?: ImageVideoControlModel[];
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
  toPlayback: EventEmitter<PlaybackInterval> = new EventEmitter();
  ngOnInit(): void {}

  onvideoplayed(video: ImageVideoControlModel) {
    this.playing = video;
    this.playing.fulled = true;
  }
  onvideostoped(video: ImageVideoControlModel) {
    if (this.playing) {
      this.playing.fulled = false;
      this.playing = undefined;
    }
  }
}

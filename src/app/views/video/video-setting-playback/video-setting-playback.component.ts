import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HowellPlaybackArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { Camera } from 'src/app/models/camera.model';
import { Duration } from 'src/app/models/duration.model';

@Component({
  selector: 'howell-video-setting-playback',
  templateUrl: './video-setting-playback.component.html',
  styleUrls: ['./video-setting-playback.component.less'],
})
export class VideoSettingPlaybackComponent implements OnInit {
  @Input() hallId?: string;
  @Output() play: EventEmitter<HowellPlaybackArgs> = new EventEmitter();
  @Input() camera?: Camera;
  @Output() cameraChange = new EventEmitter<Camera>();

  constructor() {}

  subtitle = {
    enabled: true,
  };

  ngOnInit(): void {}

  oncameraselect(camera: Camera) {
    this.camera = camera;
    this.cameraChange.emit(camera);
  }

  onplayback(duration: Duration) {
    if (!this.camera) return;
    let args = new HowellPlaybackArgs();
    args.cameraId = this.camera.Id;
    args.duration = duration;
    this.play.emit(args);
  }
}

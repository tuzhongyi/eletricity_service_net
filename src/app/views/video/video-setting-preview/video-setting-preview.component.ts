import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HowellPreviewArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { Camera } from 'src/app/models/camera.model';

@Component({
  selector: 'howell-video-setting-preview',
  templateUrl: './video-setting-preview.component.html',
  styleUrls: ['./video-setting-preview.component.less'],
})
export class VideoSettingPreviewComponent implements OnInit {
  @Input() hallId?: string;
  @Input() camera?: Camera;
  @Output() cameraChange = new EventEmitter<Camera>();
  @Output() play: EventEmitter<HowellPreviewArgs> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  async oncameraselect(camera: Camera) {
    this.camera = camera;
    this.cameraChange.emit(camera);
    let args = new HowellPreviewArgs();
    args.cameraId = camera.Id;
    this.play.emit(args);
  }
}

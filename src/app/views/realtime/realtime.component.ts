import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera } from 'src/app/models/camera.model';

@Component({
  selector: 'howell-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.less'],
})
export class RealtimeComponent implements OnInit {
  @Output()
  preview: EventEmitter<Camera> = new EventEmitter();
  @Output()
  playback: EventEmitter<Camera> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onPlayback(camera: Camera) {
    this.playback.emit(camera);
  }
  onPreview(camera: Camera) {
    this.preview.emit(camera);
  }

  onPointClicked(camera: Camera) {
    this.onPreview(camera);
  }
}

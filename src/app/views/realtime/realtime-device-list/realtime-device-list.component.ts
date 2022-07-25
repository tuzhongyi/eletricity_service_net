import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { Camera } from 'src/app/models/camera.model';

@Component({
  selector: 'howell-realtime-device-list',
  templateUrl: './realtime-device-list.component.html',
  styleUrls: ['./realtime-device-list.component.less'],
})
export class RealtimeDeviceListComponent implements OnInit {
  @Output()
  preview: EventEmitter<Camera> = new EventEmitter();
  @Output()
  playback: EventEmitter<Camera> = new EventEmitter();
  constructor() {}

  load: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    interval(60 * 1000).subscribe((x) => {
      this.load.emit();
    });
  }

  onPlayback(camera: Camera) {
    this.playback.emit(camera);
  }
  onPreview(camera: Camera) {
    this.preview.emit(camera);
  }
}

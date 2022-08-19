import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { interval } from 'rxjs';
import { Camera } from 'src/app/models/camera.model';
import { VideoArgs } from 'src/app/models/args/video.args';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeDeviceModel } from './realtime-device-list.model';

@Component({
  selector: 'howell-realtime-device-list',
  templateUrl: './realtime-device-list.component.html',
  styleUrls: ['./realtime-device-list.component.less'],
})
export class RealtimeDeviceListComponent implements OnInit {
  @Output()
  preview: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  loaded: EventEmitter<RealtimeDeviceModel[]> = new EventEmitter();
  constructor(private store: StoreService) {}

  load: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.store.interval.subscribe((x) => {
      this.load.emit();
    });
  }

  onPlayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  onPreview(args: VideoArgs) {
    this.preview.emit(args);
  }
  onLoaded(data: RealtimeDeviceModel[]) {
    this.loaded.emit(data);
  }
}

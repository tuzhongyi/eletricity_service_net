import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { Camera } from 'src/app/models/camera.model';
import { VideoArgs } from 'src/app/models/args/video.args';
import { RealtimeRecordModel } from '../tables/realtime-record-table/realtime-record-table.model';
import { RealtimeDeviceModel } from './realtime-device-list/realtime-device-list.model';
import {
  RealtimeInformationModel,
  RealtimePassengerInfo,
} from './realtime-information/realtime-information.model';
import { PictureArgs } from 'src/app/models/args/picture.args';

@Component({
  selector: 'howell-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.less'],
})
export class RealtimeComponent implements OnInit {
  @Input()
  passenger: RealtimePassengerInfo = new RealtimePassengerInfo();
  @Output()
  preview: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  constructor() {}

  record: number = 0;
  device: number = 0;

  ngOnInit(): void {}

  onPlayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  onPreview(args: VideoArgs) {
    this.preview.emit(args);
  }
  onPicture(args: PictureArgs) {
    this.picture.emit(args);
  }

  onPointClicked(camera: Camera) {
    let args = VideoArgsConverter.Convert(camera);
    this.onPreview(args);
  }

  onDeviceLoaded(datas: RealtimeDeviceModel[]) {
    this.device = 0;
    datas.forEach((x) => {
      if (x.status === DeviceStatus.offline) {
        this.device++;
      }
    });
  }
  onRecordLoaded(datas: RealtimeRecordModel[]) {
    this.record = datas.length;
  }
}

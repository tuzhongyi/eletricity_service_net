import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record.model';

@Component({
  selector: 'howell-statistic-card-record-list',
  templateUrl: './statistic-card-record-list.component.html',
  styleUrls: ['./statistic-card-record-list.component.less'],
})
export class StatisticCardRecordListComponent implements OnInit {
  @Output() picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output() playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output() trigger: EventEmitter<EventRecord> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onpicture(args: PictureArgs) {
    this.picture.emit(args);
  }
  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
  ontrigger(args: EventRecord) {
    this.trigger.emit(args);
  }
}

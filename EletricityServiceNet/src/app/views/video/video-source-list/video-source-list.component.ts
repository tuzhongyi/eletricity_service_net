import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera } from 'src/app/models/camera.model';
import { VideoSourceTableItemModel } from '../../tables/video-source-table/video-source-table.model';

@Component({
  selector: 'howell-video-source-list',
  templateUrl: './video-source-list.component.html',
  styleUrls: ['./video-source-list.component.less'],
})
export class VideoSourceListComponent implements OnInit {
  @Output()
  select: EventEmitter<Camera> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onselect(item: VideoSourceTableItemModel) {
    this.select.emit(item.data);
  }
}

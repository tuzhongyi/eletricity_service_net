import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera } from 'src/app/models/camera.model';
import { VideoSourceTableItemModel } from '../../tables/video-source-table/video-source-table.model';

@Component({
  selector: 'howell-video-source-list',
  templateUrl: './video-source-list.component.html',
  styleUrls: ['./video-source-list.component.less'],
})
export class VideoSourceListComponent implements OnInit {
  @Input()
  filter: string[] = [];
  @Input()
  load?: EventEmitter<string> = new EventEmitter();
  @Output()
  select: EventEmitter<Camera> = new EventEmitter();

  constructor() {}

  name: string = '';

  ngOnInit(): void {}

  onselect(item: VideoSourceTableItemModel) {
    this.select.emit(item.data);
  }

  search() {
    if (this.load) {
      this.load.emit(this.name);
    }
  }
}

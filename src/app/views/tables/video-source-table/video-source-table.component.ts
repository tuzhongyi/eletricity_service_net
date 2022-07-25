import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { VideoSourceTableBusiness } from './video-source-table.business';
import { VideoSourceTableItemModel } from './video-source-table.model';

@Component({
  selector: 'howell-video-source-table',
  templateUrl: './video-source-table.component.html',
  styleUrls: ['../table.less', './video-source-table.component.less'],
  providers: [VideoSourceTableBusiness],
})
export class VideoSourceTableComponent
  implements IComponent<IModel, VideoSourceTableItemModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, VideoSourceTableItemModel[]>;
  @Output()
  select: EventEmitter<VideoSourceTableItemModel> = new EventEmitter();
  constructor(business: VideoSourceTableBusiness) {
    this.business = business;
  }

  selected?: VideoSourceTableItemModel;

  datas: VideoSourceTableItemModel[] = [];
  width = ['100%'];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }

  onselect(item: VideoSourceTableItemModel) {
    this.selected = item;
    this.select.emit(item);
  }
}

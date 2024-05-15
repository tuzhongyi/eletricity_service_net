import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommonTree } from 'src/app/components/common-tree/common-tree.interface';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { VideoSourceTableBusiness } from '../video-source-table/video-source-table.business';
import { VideoSourceTableItemModel } from '../video-source-table/video-source-table.model';

@Component({
  selector: 'howell-video-source-select-table',
  templateUrl: './video-source-select-table.component.html',
  styleUrls: [
    '../table-list.less',
    './video-source-select-table.component.less',
  ],
  providers: [VideoSourceTableBusiness],
})
export class VideoSourceSelectTableComponent
  implements
    IComponent<IModel, VideoSourceTableItemModel[]>,
    OnInit,
    ICommonTree
{
  @Input() business: IBusiness<IModel, VideoSourceTableItemModel[]>;
  @Input() hallId?: string;

  @Input() filter: string[] = [];
  @Input() load?: EventEmitter<string>;
  @Input() checkable = true;
  @Input()
  selecteds: VideoSourceTableItemModel[] = [];
  @Output()
  selectedsChange: EventEmitter<VideoSourceTableItemModel[]> =
    new EventEmitter();

  constructor(business: VideoSourceTableBusiness) {
    this.business = business;
  }

  datas: VideoSourceTableItemModel[] = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((name) => {
        this.loadData(name);
      });
    }
    this.loadData();
  }

  loadData(name?: string) {
    this.business.load(this.hallId, name).then((datas) => {
      for (let i = 0; i < this.filter.length; i++) {
        const id = this.filter[i];
        let index = datas.findIndex((x) => x.id == id);
        if (index < 0) continue;
        datas.splice(index, 1);
      }
      this.datas = datas;
    });
  }

  onselect(e: Event, item: VideoSourceTableItemModel) {
    e.stopImmediatePropagation();
    let index = this.selecteds.findIndex((x) => x.id == item.id);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
  onchange(e: Event, item: VideoSourceTableItemModel) {
    e.stopImmediatePropagation();
    let index = this.selecteds.findIndex((x) => x.id == item.id);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }

  toggleNodes(ids: string[], clear?: boolean | undefined): void {
    this.selecteds = this.selecteds.filter((x) => !ids.includes(x.id));
    this.selectedsChange.emit(this.selecteds);
  }
}

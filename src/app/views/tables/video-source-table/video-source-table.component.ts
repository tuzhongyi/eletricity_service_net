import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  implements IComponent<IModel, VideoSourceTableItemModel[]>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, VideoSourceTableItemModel[]>;
  @Input()
  hallId?: string;
  @Output()
  select: EventEmitter<VideoSourceTableItemModel> = new EventEmitter();
  @Input()
  filter: string[] = [];
  @Input()
  load?: EventEmitter<string>;

  constructor(business: VideoSourceTableBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.loadData();
    }
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((name) => {
          this.loadData(name);
        });
      }
    }
  }

  selected?: VideoSourceTableItemModel;

  datas: VideoSourceTableItemModel[] = [];
  width = ['100%'];

  ngOnInit(): void {
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

  onselect(item: VideoSourceTableItemModel) {
    this.selected = item;
    this.select.emit(item);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { VideoSubtitleTableBusiness } from './video-subtitle-table.business';
import { VideoSubtitleTableArgs } from './video-subtitle-table.model';

@Component({
  selector: 'howell-video-subtitle-table',
  templateUrl: './video-subtitle-table.component.html',
  styleUrls: ['../table-list.less', './video-subtitle-table.component.less'],
  providers: [VideoSubtitleTableBusiness],
})
export class VideoSubtitleTableComponent
  extends PagedTableAbstractComponent<SubtitlingItem>
  implements IComponent<IModel, PagedList<SubtitlingItem>>, OnInit
{
  @Input()
  business: IBusiness<IModel, PagedList<SubtitlingItem>>;

  @Input()
  args = new VideoSubtitleTableArgs();
  @Input()
  load?: EventEmitter<VideoSubtitleTableArgs>;
  @Output()
  select: EventEmitter<SubtitlingItem> = new EventEmitter();

  constructor(business: VideoSubtitleTableBusiness) {
    super();
    this.business = business;
  }

  selected?: SubtitlingItem;

  widths: (string | undefined)[] = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1);
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size = this.pageSize) {
    this.business.load(index, size, this.args).then((paged) => {
      this.datas = paged.Data;
      this.page = paged.Page;
    });
  }

  onselect(item: SubtitlingItem) {
    this.selected = item;
    this.select.emit(item);
  }
}

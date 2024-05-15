import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page.model';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { Language } from 'src/app/tools/language';
import { SettingsSubtitleChannelTableBusiness } from './settings-subtitle-channel-table.business';
import { SettingsSubtitleChannelTableConverter } from './settings-subtitle-channel-table.converter';
import {
  SettingsSubtitleChannelTableOptions,
  SubtitlingChannelModel,
} from './settings-subtitle-channel-table.model';

@Component({
  selector: 'howell-settings-subtitle-channel-table',
  templateUrl: './settings-subtitle-channel-table.component.html',
  styleUrls: [
    '../table-list.less',
    './settings-subtitle-channel-table.component.less',
  ],
  providers: [
    SettingsSubtitleChannelTableConverter,
    SettingsSubtitleChannelTableBusiness,
  ],
})
export class SettingsSubtitleChannelTableComponent
  implements OnInit, OnDestroy
{
  @Input()
  options: SettingsSubtitleChannelTableOptions =
    new SettingsSubtitleChannelTableOptions();
  @Input()
  load?: EventEmitter<SettingsSubtitleChannelTableOptions>;
  @Output()
  remove = new EventEmitter<SubtitlingChannel>();
  @Output()
  enablechange = new EventEmitter<SubtitlingChannel>();

  constructor(private business: SettingsSubtitleChannelTableBusiness) {}

  datas?: SubtitlingChannelModel[];
  widths = ['auto', '200px', '8%', '8%', '10%', '10%', '10%', '10%', '6%'];
  Language = Language;
  page?: Page;
  @ViewChild('body') bodyElement?: ElementRef;

  get body_height() {
    if (this.bodyElement) {
      let div = this.bodyElement.nativeElement as HTMLDivElement;
      return div.clientHeight;
    }
    return undefined;
  }

  ngOnDestroy(): void {
    if (this.load) {
      this.load.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.options = x;
        this.loadData();
      });
    }
    this.loadData();
  }

  loadData() {
    this.business.load(this.options).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
    });
  }

  onremove(e: Event, item: SubtitlingChannelModel) {
    e.stopImmediatePropagation();
    this.remove.emit(item);
  }

  onenablechange(e: Event, item: SubtitlingChannelModel) {
    e.stopImmediatePropagation();
    this.enablechange.emit(item);
  }

  async pageEvent(page: PageEvent) {
    this.options.pageIndex = page.pageIndex + 1;
    this.options.pageSize = page.pageSize;

    this.loadData();
  }
}

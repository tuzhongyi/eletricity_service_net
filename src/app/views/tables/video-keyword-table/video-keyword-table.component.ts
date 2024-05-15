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
import { VideoArgs } from 'src/app/models/args/video.args';
import { Page } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { Language } from 'src/app/tools/language';
import { VideoKeywordTableBusiness } from './video-keyword-table.business';
import { VideoKeywordTableOptions } from './video-keyword-table.model';

@Component({
  selector: 'howell-video-keyword-table',
  templateUrl: './video-keyword-table.component.html',
  styleUrls: ['../table-list.less', './video-keyword-table.component.less'],
  providers: [VideoKeywordTableBusiness],
})
export class VideoKeywordTableComponent implements OnInit, OnDestroy {
  @Input()
  options: VideoKeywordTableOptions = new VideoKeywordTableOptions();
  @Input()
  load?: EventEmitter<VideoKeywordTableOptions>;
  @Output()
  playback: EventEmitter<VideoArgs<SubtitlingItem>> = new EventEmitter();

  constructor(private business: VideoKeywordTableBusiness) {}

  datas?: SubtitlingItem[];
  widths = ['20%', '20%', '20%', '30%', '10%'];
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

  async pageEvent(page: PageEvent) {
    this.options.pageIndex = page.pageIndex + 1;
    this.options.pageSize = page.pageSize;

    this.loadData();
  }

  onplayback(item: SubtitlingItem) {
    let args = this.business.convert(item);
    this.playback.emit(args);
  }
}

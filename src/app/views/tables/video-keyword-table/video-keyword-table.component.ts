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
  @Input() options: VideoKeywordTableOptions = new VideoKeywordTableOptions();
  @Input() load?: EventEmitter<VideoKeywordTableOptions>;
  @Input() autoload = false;
  @Input() selected?: SubtitlingItem;
  @Output() selectedChange = new EventEmitter<SubtitlingItem>();
  @Output() loaded = new EventEmitter<SubtitlingItem[]>();

  constructor(private business: VideoKeywordTableBusiness) {}

  datas?: SubtitlingItem[];
  widths = ['86px'];
  Language = Language;
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
    if (this.autoload) {
      this.loadData();
    }
  }

  loadData() {
    this.business.load(this.options).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }

  onselect(item: SubtitlingItem) {
    this.selected = item;
    this.selectedChange.emit(item);
  }
}

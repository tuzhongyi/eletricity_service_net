import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import { HowellSubtitlingArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { VideoArgs } from 'src/app/models/args/video.args';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { VideoKeywordTableOptions } from '../../tables/video-keyword-table/video-keyword-table.model';
import { VideoKeywordsVideoController } from './video-keywords-video.controller';
import { VideoKeywordsBusiness } from './video-keywords.business';
import { VideoKeywordsChannelSelection } from './video-keywords.selection';

@Component({
  selector: 'howell-video-keywords',
  templateUrl: './video-keywords.component.html',
  styleUrls: ['./video-keywords.component.less'],
  providers: [VideoKeywordsBusiness],
})
export class VideoKeywordsComponent implements OnInit {
  public get screen(): { mode: ScreenMode; index: number } {
    return this.video.screen;
  }
  @Input()
  public set screen(v: { mode: ScreenMode; index: number }) {
    this.video.screen = v;
  }

  @Output() playback = new EventEmitter<VideoArgs>();

  constructor(private business: VideoKeywordsBusiness) {
    this.begin = new TimeModel(this.options.begin);
    this.end = new TimeModel(this.options.end);
  }
  options: VideoKeywordTableOptions = new VideoKeywordTableOptions();
  DateTimePickerView = DateTimePickerView;
  load = new EventEmitter<VideoKeywordTableOptions>();

  video = new VideoKeywordsVideoController();

  selected?: SubtitlingItem;
  subtitling = new EventEmitter<HowellSubtitlingArgs>();

  selection = new VideoKeywordsChannelSelection();
  date = new Date();
  begin: TimeModel;
  end: TimeModel;
  datas: SubtitlingItem[] = [];

  ngOnInit(): void {
    this.selection.select.subscribe((x) => {
      this.options.channels = x.map((x) => x.Id);
    });
  }

  onbegin(time: TimeModel) {
    this.options.begin = time.toDate(this.date);
  }
  onend(time: TimeModel) {
    this.options.end = time.toDate(this.date);
  }

  onsearch() {
    this.options.begin.setDate(this.date.getDate());
    this.options.begin.setMonth(this.date.getMonth());
    this.options.begin.setFullYear(this.date.getFullYear());
    this.options.end.setDate(this.date.getDate());
    this.options.end.setMonth(this.date.getMonth());
    this.options.end.setFullYear(this.date.getFullYear());
    this.load.emit(this.options);
  }

  onloaded(datas: SubtitlingItem[]) {
    this.datas = datas;
    this.video.isplaying = false;
  }

  async onselect(item: SubtitlingItem) {
    this.selected = item;
    if (this.datas.length === 0) return;
    let args = new HowellSubtitlingArgs();
    args.datas = this.datas;
    args.selected = item;
    this.subtitling.emit(args);
  }
}

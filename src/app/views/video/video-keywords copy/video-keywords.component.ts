import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { VideoArgs } from 'src/app/models/args/video.args';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { VideoKeywordTableOptions } from '../../tables/video-keyword-table/video-keyword-table.model';
import { VideoKeywordsChannelSelection } from './video-keywords.selection';

@Component({
  selector: 'howell-video-keywords',
  templateUrl: './video-keywords.component.html',
  styleUrls: ['./video-keywords.component.less'],
})
export class VideoKeywordsComponent implements OnInit {
  @Output() playback = new EventEmitter<VideoArgs>();
  constructor() {}
  options: VideoKeywordTableOptions = new VideoKeywordTableOptions();
  DateTimePickerView = DateTimePickerView;
  load = new EventEmitter<VideoKeywordTableOptions>();

  selection = new VideoKeywordsChannelSelection();

  ngOnInit(): void {
    this.selection.select.subscribe((x) => {
      this.options.channels = x.map((x) => x.Id);
    });
  }

  onbegin(date: Date) {
    if (DateTimeTool.equals.date(date, this.options.end)) return;
    let end = new Date(this.options.end.getTime());
    end.setFullYear(date.getFullYear());
    end.setMonth(date.getMonth());
    end.setDate(date.getDate());
    this.options.end = end;
  }
  onend(date: Date) {
    if (DateTimeTool.equals.date(date, this.options.begin)) return;
    let begin = new Date(this.options.begin.getTime());
    begin.setFullYear(date.getFullYear());
    begin.setMonth(date.getMonth());
    begin.setDate(date.getDate());
    this.options.begin = begin;
  }

  onsearch() {
    this.load.emit(this.options);
  }

  onplayback(args: VideoArgs) {
    this.playback.emit(args);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { Duration } from 'src/app/models/duration.model';
import { SelectItem } from 'src/app/models/select-item.model';

@Component({
  selector: 'howell-video-playback-config',
  templateUrl: './video-playback-config.component.html',
  styleUrls: ['./video-playback-config.component.less'],
})
export class VideoPlaybackConfigComponent implements OnInit {
  @Output()
  change: EventEmitter<Duration> = new EventEmitter();
  @Output()
  playback: EventEmitter<Duration> = new EventEmitter();

  constructor() {
    let now = new Date();
    this.end = new TimeModel(new Date(now.getTime()));
    now.setMinutes(now.getMinutes() - 15);
    this.begin = new TimeModel(new Date(now.getTime()));
  }

  date: Date = new Date();
  DateTimePickerView = DateTimePickerView;

  begin: TimeModel;
  end: TimeModel;

  times: SelectItem<Duration>[] = [];

  ngOnInit(): void {
    this.initTimes();
  }

  initTimes() {
    for (let i = 0; i < 24; i++) {
      let time = new SelectItem();
      let before = '';
      let after = '';
      if (i < 10) {
        before = '0';
      }
      if (i + 1 < 10) {
        after = '0';
      }
      time.language = `${before}${i}:00 - ${after}${i + 1}:00`;
      time.value = {
        begin: new Date(
          this.date.getFullYear(),
          this.date.getMonth() + 1,
          this.date.getDate(),
          i
        ),
        end: new Date(
          this.date.getFullYear(),
          this.date.getMonth() + 1,
          this.date.getDate(),
          i + 1
        ),
      };
      this.times.push(time);
    }
  }

  changeDate(date: Date) {
    this.date = date;
    let duration = {
      begin: this.begin.toDate(),
      end: this.end.toDate(),
    };
    this.change.emit(duration);
  }

  ontimeselect(item: SelectItem) {
    this.begin = new TimeModel(item.value.begin);
    this.end = new TimeModel(item.value.end);
    this.change.emit(item.value);
  }

  onPlaybackClicked() {
    this.begin.hour.value = +this.begin.hour.view;
    this.begin.minute.value = +this.begin.minute.view;
    this.begin.second.value = +this.begin.second.view;

    this.end.hour.value = +this.end.hour.view;
    this.end.minute.value = +this.end.minute.view;
    this.end.second.value = +this.end.second.view;

    let duration = {
      begin: this.begin.toDate(),
      end: this.end.toDate(),
    };
    this.playback.emit(duration);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Language } from 'src/app/tools/language';
import { DayTimeSegmentModel } from '../settings-subtitle-channel-schedule/settings-subtitle-channel-schedule.model';

@Component({
  selector: 'howell-settings-subtitle-channel-schedule-week-copy',
  templateUrl: './settings-subtitle-channel-schedule-week-copy.component.html',
  styleUrls: ['./settings-subtitle-channel-schedule-week-copy.component.less'],
})
export class SettingsSubtitleChannelScheduleWeekCopyComponent
  implements OnInit
{
  @Input() day?: DayTimeSegmentModel;
  @Output() copy = new EventEmitter<DayTimeSegmentModel[]>();
  @Output() cancel = new EventEmitter();

  constructor() {}

  weeks: number[] = [0, 1, 2, 3, 4, 5, 6];
  Language = Language;
  segments: DayTimeSegmentModel[] = [];

  get copied() {
    let days = this.segments.map((x) => x.DayOfWeek);
    return days;
  }

  ngOnInit(): void {
    console.log(this.day);
  }

  onall() {
    if (!this.day) return;
    for (let i = 0; i < this.weeks.length; i++) {
      const week = this.weeks[i];
      if (week === this.day.DayOfWeek) continue;
      this.onweek(week, true);
    }
  }
  onweek(week: number, checked?: boolean) {
    if (!this.day) return;
    let index = this.segments.findIndex((x) => x.DayOfWeek === week);

    if (index < 0) {
      let plain = instanceToPlain(this.day);
      let copy = plainToInstance(DayTimeSegmentModel, plain);
      copy.DayOfWeek = week;
      this.segments.push(copy);
    } else {
      if (!checked) {
        this.segments.splice(index, 1);
      }
    }
  }
  oncopy() {
    this.copy.emit(this.segments);
  }

  onclose() {
    this.cancel.emit();
  }
}

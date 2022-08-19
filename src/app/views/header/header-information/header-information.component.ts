import { formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { interval, timer } from 'rxjs';
import { WeatherType } from 'src/app/enums/weather-type.enum';
import { Language } from 'src/app/tools/language';
import { HeaderInformationModel } from './header-information.model';

@Component({
  selector: 'howell-header-information',
  templateUrl: './header-information.component.html',
  styleUrls: ['./header-information.component.less'],
})
export class HeaderInformationComponent implements OnInit, OnChanges {
  @Input('date')
  input_date: Date = new Date();
  constructor() {}
  date: Date = new Date();

  model: HeaderInformationModel = new HeaderInformationModel();

  Language = Language;

  intervalHandle?: NodeJS.Timer;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['input_date']) {
      this.date = new Date();
    }
  }
  ngOnInit(): void {
    interval(1000).subscribe((x) => {
      this.refresh();
    });
    this.refresh();
  }

  refresh() {
    let now = new Date();
    let interval = now.getTime() - this.date.getTime();

    let date = new Date(this.input_date.getTime() + interval);

    this.model.time = Language.DateTime(date, 'HH:mm:ss');
    this.model.date = Language.DateTime(date, 'yyyy年MM月dd日');
    this.model.week = Language.Week(date.getDay(), '星期');
  }
}

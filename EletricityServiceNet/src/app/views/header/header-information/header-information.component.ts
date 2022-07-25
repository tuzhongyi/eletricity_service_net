import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';
import { WeatherType } from 'src/app/enums/weather-type.enum';
import { Language } from 'src/app/tools/language';
import { HeaderInformationModel } from './header-information.model';

@Component({
  selector: 'howell-header-information',
  templateUrl: './header-information.component.html',
  styleUrls: ['./header-information.component.less'],
})
export class HeaderInformationComponent implements OnInit {
  @Input()
  weather?: WeatherType;
  @Input()
  low?: number;
  @Input()
  high?: number;
  constructor() {}

  model: HeaderInformationModel = new HeaderInformationModel();

  Language = Language;

  intervalHandle?: NodeJS.Timer;

  ngOnInit(): void {
    interval(1000).subscribe((x) => {
      this.refresh();
    });
    this.refresh();
  }

  refresh() {
    let date = new Date();
    this.model.time = Language.DateTime(date, 'HH:mm:ss');
    this.model.date = Language.DateTime(date, 'yyyy年MM月dd日');
    this.model.week = Language.Week(date.getDay(), '星期');
    if (this.weather) {
      this.model.weather = Language.Weather(this.weather);
    }
    if (this.low || this.low === 0) {
      this.model.low = this.low.toString();
    }
    if (this.high || this.high === 0) {
      this.model.high = this.high.toString();
    }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherType } from 'src/app/enums/weather-type.enum';
import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { NavigationPath } from './header-navigation/navigarion-path.enum';

@Component({
  selector: 'howell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Input()
  path: NavigationPath = NavigationPath.realtime;
  @Input()
  title: string = '';
  @Output()
  navigate: EventEmitter<NavigationPath> = new EventEmitter();
  @Input()
  weather?: WeatherType;
  @Input()
  low?: number;
  @Input()
  high?: number;

  constructor() {}

  ngOnInit(): void {}

  onpathchanged(path: NavigationPath) {
    this.path = path;
    this.navigate.emit(path);
  }
}

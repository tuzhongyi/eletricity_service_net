import { Component, OnInit } from '@angular/core';
import { ChartType } from 'src/app/enums/chart-type.enum';
import { PassengerStatisticZoneBusiness } from './passenger-statistic-zone/passenger-statistic-zone.business';
import { PassengerPath } from './passenger.model';

@Component({
  selector: 'howell-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.less'],
  providers: [PassengerStatisticZoneBusiness],
})
export class PassengerComponent implements OnInit {
  constructor(public zone: PassengerStatisticZoneBusiness) {}

  path: PassengerPath = PassengerPath.statistic;
  PassengerPath = PassengerPath;
  ChartType = ChartType;

  ngOnInit(): void {}

  changePath(path: PassengerPath) {
    this.path = path;
  }
}

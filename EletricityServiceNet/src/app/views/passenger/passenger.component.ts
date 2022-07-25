import { Component, OnInit } from '@angular/core';
import { PassengerPath } from './passenger.model';

@Component({
  selector: 'howell-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.less'],
})
export class PassengerComponent implements OnInit {
  constructor() {}

  path: PassengerPath = PassengerPath.statistic;
  PassengerPath = PassengerPath;

  ngOnInit(): void {}

  changePath(path: PassengerPath) {
    this.path = path;
  }
}

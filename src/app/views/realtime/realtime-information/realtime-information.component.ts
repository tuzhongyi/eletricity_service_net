import { Component, Input, OnInit } from '@angular/core';
import { RealtimePassengerInfo } from './realtime-information.model';

@Component({
  selector: 'howell-realtime-information',
  templateUrl: './realtime-information.component.html',
  styleUrls: ['./realtime-information.component.less'],
})
export class RealtimeInformationComponent implements OnInit {
  @Input()
  passenger: RealtimePassengerInfo = new RealtimePassengerInfo();
  @Input()
  device: number = 0;
  @Input()
  record: number = 0;

  constructor() {}

  ngOnInit(): void {}

  async loadData() {}
}

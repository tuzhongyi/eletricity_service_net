import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'howell-realtime-statistic-body-item',
  templateUrl: './realtime-statistic-body-item.component.html',
  styleUrls: ['./realtime-statistic-body-item.component.less'],
})
export class RealtimeStatisticBodyItemComponent implements OnInit {
  @Input()
  value: number = 0;
  @Input()
  title: string = '';
  constructor() {}

  ngOnInit(): void {}
}

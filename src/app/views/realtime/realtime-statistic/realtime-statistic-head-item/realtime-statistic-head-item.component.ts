import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'howell-realtime-statistic-head-item',
  templateUrl: './realtime-statistic-head-item.component.html',
  styleUrls: ['./realtime-statistic-head-item.component.less'],
})
export class RealtimeStatisticHeadItemComponent implements OnInit {
  @Input()
  icon?: string;
  @Input()
  value: number = 0;
  @Input()
  title: string = '';

  constructor() {}

  ngOnInit(): void {}
}

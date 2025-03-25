import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'howell-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.less'],
})
export class StatisticCardComponent implements OnInit {
  @Input() span: number = 1;
  constructor() {}

  ngOnInit(): void {}
}

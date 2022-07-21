import { Component, OnInit } from '@angular/core';
import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import { Position } from 'src/app/models/position.model';

@Component({
  selector: 'howell-realtime-heatmap',
  templateUrl: './realtime-heatmap.component.html',
  styleUrls: ['./realtime-heatmap.component.less'],
})
export class RealtimeHeatmapComponent implements OnInit {
  constructor() {}

  url: string = 'assets/images/test/test.svg';
  points: IPoint[] = [{ position: { X: 0.5, Y: 0.5 } }];

  ngOnInit(): void {}

  onClick(position: Position) {
    console.log(position);
  }
}

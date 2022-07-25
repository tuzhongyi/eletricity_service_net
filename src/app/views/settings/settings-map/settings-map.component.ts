import { Component, Input, OnInit } from '@angular/core';
import {
  IPoint,
  MapChartPoint,
} from 'src/app/components/charts/map-chart/map-chart.model';
import { Position } from 'src/app/models/position.model';

@Component({
  selector: 'howell-settings-map',
  templateUrl: './settings-map.component.html',
  styleUrls: ['./settings-map.component.less'],
})
export class SettingsMapComponent implements OnInit {
  @Input()
  url: string = '';
  @Input()
  points: MapChartPoint[] = [];

  constructor() {}

  ngOnInit(): void {}

  onClick(position: Position) {}

  onPointClick(point: IPoint) {}
}

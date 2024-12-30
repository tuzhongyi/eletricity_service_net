import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { timer } from 'rxjs';
import { HeatMapPoint } from 'src/app/models/heat-map-point.model';
import { HeatmapChartOptions } from './heatmap-chart.option';

declare let $: any;

@Component({
  selector: 'howell-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.less'],
})
export class HeatmapChartComponent implements OnInit, AfterViewInit {
  @Input() url: string = '';
  @Input('load') _load?: EventEmitter<HeatMapPoint[]>;

  constructor() {}

  option: EChartsOption = HeatmapChartOptions;
  echarts!: echarts.ECharts;
  @ViewChild('echarts')
  element?: ElementRef<HTMLDivElement>;
  points: HeatMapPoint[] = [];

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((points: HeatMapPoint[]) => {
        this.points = points;
        this.load();
      });
    }
  }
  ngAfterViewInit(): void {
    timer(10).subscribe(() => {
      if (this.element) {
        this.echarts = echarts.init(this.element.nativeElement);
        if (this.url) {
          this.init(this.url);
        }
      }
    });
  }

  init(url: string) {
    echarts.registerMap('sicily', { svg: url });

    this.load();
  }

  load() {
    if (this.points.length > 0) {
      let serie = (this.option.series as any)[0];
      serie.data = this.convert(this.points);
    }

    if (!this.echarts) return;
    this.echarts.setOption(this.option!);
  }

  convert(datas: HeatMapPoint[]) {
    if (!this.element) return;
    let points: number[][] = [];
    for (let i = 0; i < datas.length; i++) {
      const input = datas[i];
      let position = [
        input.PositionX * this.element.nativeElement.offsetWidth,
        input.PositionY * this.element.nativeElement.offsetHeight,
      ];
      var data = this.echarts.convertFromPixel({ geoIndex: 0 }, position);
      let x = data[0];
      let y = data[1];

      points.push([x, y, 1]);
    }
    return points;
  }
}

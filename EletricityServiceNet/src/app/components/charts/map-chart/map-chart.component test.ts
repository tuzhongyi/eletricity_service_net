import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

declare let $: any;

@Component({
  selector: 'howell-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.less'],
})
export class MapChartComponent implements OnInit, AfterViewInit {
  constructor() {}

  option?: EChartsOption;
  echarts?: echarts.ECharts;
  @ViewChild('echarts')
  element?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.element) {
      this.echarts = echarts.init(this.element.nativeElement);
      this.init(
        this.element.nativeElement.offsetWidth,
        this.element.nativeElement.offsetHeight
      );
    }
  }

  getImage(url: string, width: number, height: number): Promise<string> {
    return new Promise((resolve) => {
      let image = new Image();
      image.src = url;
      image.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext('2d')!;
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        ctx.translate(x, y);
        ctx.drawImage(image, 0, 0, width, height);
        let data = canvas.toDataURL();
        resolve(data);
      };
    });
  }

  async init(width: number, height: number) {
    let image = await this.getImage('assets/images/test.png', width, height);
    this.option = {
      // -------------
      // Make buttons
      geo: [
        {
          map: 'sicily',
          roam: true,
          layoutCenter: ['50%', '50%'],
          layoutSize: '100%',
          selectedMode: 'single',
        },
      ],
      grid: {
        top: 10,
        left: 'center',
        width: 180,
        height: 520,
      },
      xAxis: {
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
      },

      series: [
        {
          symbol: image,
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 5,
        },
      ],
    };
    if (!this.echarts) return;
    this.echarts.setOption(this.option);
  }
}

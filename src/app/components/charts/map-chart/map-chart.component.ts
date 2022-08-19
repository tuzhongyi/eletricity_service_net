import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { timer } from 'rxjs';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { Position } from 'src/app/models/position.model';
import { MapChartPointConverter } from './map-chart.converter';
import { IPoint, MapChartPoint } from './map-chart.model';

declare let $: any;

@Component({
  selector: 'howell-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.less'],
})
export class MapChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  url: string = '';
  @Input('points')
  input_points: IPoint[] = [];
  @Output()
  onclick: EventEmitter<Position> = new EventEmitter();
  @Output()
  onpointclick: EventEmitter<IPoint> = new EventEmitter();
  @Output()
  onpointdblclick: EventEmitter<IPoint> = new EventEmitter();
  @Output()
  ondblclick: EventEmitter<Position> = new EventEmitter();

  constructor() {}

  points: Array<MapChartPoint> = [];
  selected?: MapChartPoint;
  option?: EChartsOption;
  echarts!: echarts.ECharts;
  @ViewChild('echarts')
  element?: ElementRef<HTMLDivElement>;

  converter = {
    point: new MapChartPointConverter(),
  };

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    timer(10).subscribe(() => {
      if (this.element) {
        this.echarts = echarts.init(this.element.nativeElement);
        if (this.url) {
          this.init(this.url, true);
          timer(500).subscribe(() => {
            this.displayPoints();
          });
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url']) {
      if (this.url) {
        this.init(this.url);
      }
    }
    if (!changes['input_points'].firstChange) {
      this.displayPoints();
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
  getPoints() {
    if (!this.element) return;
    this.points = new Array();
    for (let i = 0; i < this.input_points.length; i++) {
      const input = this.input_points[i];
      let point = this.converter.point.Convert(input);
      let position = [
        input.position.X * this.element.nativeElement.offsetWidth,
        input.position.Y * this.element.nativeElement.offsetHeight,
      ];
      var data = this.echarts.convertFromPixel({ geoIndex: 0 }, position);
      point.position.X = data[0];
      point.position.Y = data[1];

      this.points.push(point);
    }
  }

  displayPoints() {
    if (!this.option) return;
    this.getPoints();
    (this.option.series as echarts.SeriesOption[])[0].data = this.points.map(
      (x) => {
        return {
          name: x.id,
          value: [x.position.X, x.position.Y, x.radius],
        };
      }
    );
    this.echarts.setOption(this.option);
  }
  selectPoint(point: IPoint) {
    if (!this.option) return;
    (this.option.series as echarts.SeriesOption[])[1].data = [point];
    this.echarts.setOption(this.option);
  }
  init(url: string, registEvent = false) {
    echarts.registerMap('sicily', { svg: url });
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
      tooltip: {
        formatter: (params: any) => {
          let key = params.data.name;
          let point = this.points.find((x) => x.id == key);
          if (point) {
            return point.name;
          }
          return '';
        },
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          symbolSize: function (params) {
            return (params[2] / 100) * 15 + 10;
          },
          encode: {
            tooltip: 2,
          },

          label: {
            formatter: (args: any) => {
              console.log(args);
              let point = this.points.find((x) => x.id == args.name);

              return point ? point.name : '';
            },
            position: 'bottom',
            show: false,
          },
          symbol: `image://assets/images/camera.png`,
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          animation: false,
          geoIndex: 0,
          symbolSize: function (params) {
            return (params[2] / 100) * 15 + 10;
          },
          encode: {
            tooltip: 2,
          },

          label: {
            formatter: (args: any) => {
              console.log(args);
              let point = this.points.find((x) => x.id == args.name);

              return point ? point.name : '';
            },
            position: 'bottom',
            show: false,
          },
          symbol: `image://assets/images/camera.png`,
        },
      ],
      // Make buttons end
      // -----------------
    };

    if (!this.echarts) return;
    this.echarts.setOption(this.option!);

    if (registEvent) {
      this.echarts.getZr().on('click', (params: any) => {
        // var pixelPoint = [params.offsetX, params.offsetY];
        // var dataPoint = this.echarts.convertFromPixel(
        //   { geoIndex: 0 },
        //   pixelPoint
        // );
        if (this.element) {
          let position = new Position();
          position.X = params.offsetX / this.element.nativeElement.offsetWidth;
          position.Y = params.offsetY / this.element.nativeElement.offsetHeight;
          this.onclick.emit(position);
        }
      });
      this.echarts.getZr().on('dblclick', (params: any) => {
        if (this.element) {
          let position = new Position();
          position.X = params.offsetX / this.element.nativeElement.offsetWidth;
          position.Y = params.offsetY / this.element.nativeElement.offsetHeight;
          this.ondblclick.emit(position);
        }
      });
      this.echarts.on('click', 'series.scatter', (trigger: any) => {
        this.onPointClick(trigger, this.onpointclick);
      });
      this.echarts.on('dblclick', 'series.scatter', (trigger: any) => {
        this.onPointClick(trigger, this.onpointdblclick);
      });
      this.echarts.on('click', 'series.effectScatter', (trigger: any) => {
        this.onPointClick(trigger, this.onpointclick);
      });
      this.echarts.on('dblclick', 'series.effectScatter', (trigger: any) => {
        this.onPointClick(trigger, this.onpointdblclick);
      });
    }
  }

  onPointClick(trigger: any, event: EventEmitter<IPoint>) {
    console.log(trigger);
    this.selectPoint(trigger.data);
    let pixel = this.echarts.convertToPixel(
      { geoIndex: 0 },
      trigger.data.value
    ) as unknown as number[];
    console.log('point', pixel);
    let width = this.element ? this.element.nativeElement.offsetWidth : 0;
    let height = this.element ? this.element.nativeElement.offsetHeight : 0;
    event.emit({
      id: trigger.data.name,
      name: '',
      status: DeviceStatus.online,
      position: {
        X: width ? pixel[0] / width : pixel[0],
        Y: height ? pixel[1] / height : pixel[1],
      },
    });
  }
}

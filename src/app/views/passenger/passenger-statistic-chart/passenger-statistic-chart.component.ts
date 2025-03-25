import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LegendComponentOption } from 'echarts';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { ChartType } from 'src/app/enums/chart-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { ChartConfig, EChartOptions } from './passenger-statistic.model';

@Component({
  selector: 'howell-passenger-statistic-chart',
  templateUrl: './passenger-statistic-chart.component.html',
  styleUrls: ['./passenger-statistic-chart.component.less'],
})
export class PassengerStatisticChartComponent implements OnInit, OnChanges {
  @Input() unit: TimeUnit = TimeUnit.Hour;
  @Input() duration = DateTimeTool.allDay(new Date());
  @Input() datas: ITimeDataGroup<number>[] = [];
  @Input() chart: ChartType = ChartType.bar;
  constructor() {}

  ChartType = ChartType;

  config: Config = { bar: {}, line: {} };
  echartsLegend: LegendComponentOption = {
    selectedMode: true,
    show: true,
    right: '20px',
    top: '0',

    icon: '',
    orient: 'horizontal',
    textStyle: {
      fontSize: 24,
      color: '#fff',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas']) {
      this.loadChart(this.datas);
    }
    if (changes['chart']) {
      this.loadChart(this.datas);
    }
  }

  ngOnInit(): void {
    this.loadChart(this.datas);
  }

  private loadChart(datas: ITimeDataGroup<number>[]) {
    let merge: EChartOptions = this.getEChartsMerge(this.chart, datas);
    this.config.line = undefined;
    this.config.bar = undefined;
    switch (this.chart) {
      case ChartType.line:
        this.config.line = new ChartConfig(
          this.unit,
          this.duration.begin,
          this.echartsLegend,
          merge
        );
        break;
      case ChartType.bar:
        this.config.bar = new ChartConfig(
          this.unit,
          this.duration.begin,
          this.echartsLegend,
          merge
        );
        break;
      default:
        break;
    }
  }

  private getEChartsMerge(
    type: ChartType,
    datas: ITimeDataGroup<number>[]
  ): EChartOptions {
    switch (type) {
      case ChartType.line:
        return {
          series: datas.map((data, i) => {
            return {
              type: 'line',
              name: data.Name,
              data: data.datas.map((x) => x.value),
              smooth: true,
              label: {
                formatter: (params: any) => {
                  return params.value.toString();
                },
              },
            };
          }),
        };
      case ChartType.bar:
      default:
        let width = 30;
        switch (this.unit) {
          case TimeUnit.Month:
            width = 15;
            break;
          case TimeUnit.Hour:
            width = 20;
            break;
          default:
            break;
        }

        return {
          series: datas.map((data, i) => {
            return {
              type: 'bar',
              name: data.Name,
              data: data.datas.map((x) => x.value),
              barWidth: `${width}px`,
              barMinHeight: 5,
              label: {
                show: false,
                position: 'top',
                color: ChartConfig.color[i],
                fontSize: '16px',
                textBorderWidth: 0,
                formatter: (params: any) => {
                  return params.value.toString();
                },
              },
            };
          }),
        };
    }
  }
}
interface Config {
  line: any;
  bar: any;
}

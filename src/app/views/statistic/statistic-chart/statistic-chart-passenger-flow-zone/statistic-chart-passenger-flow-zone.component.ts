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
import {
  ChartConfig,
  EChartOptions,
} from './statistic-chart-passenger-flow-zone.model';

@Component({
  selector: 'howell-statistic-chart-passenger-flow-zone',
  templateUrl: './statistic-chart-passenger-flow-zone.component.html',
  styleUrls: ['./statistic-chart-passenger-flow-zone.component.less'],
})
export class StatisticChartPassengerFlowZoneComponent
  implements OnInit, OnChanges
{
  @Input() datas: ITimeDataGroup<number>[] = [];
  @Input() begin = 8;
  @Input() end = 18;
  constructor() {}

  ChartType = ChartType;

  config: Config = { bar: {}, line: {} };
  echartsLegend: LegendComponentOption = {
    selectedMode: true,
    show: true,
    right: '20px',
    top: '0',

    icon: '',
    itemWidth: 10,
    itemHeight: 10,
    orient: 'horizontal',
    textStyle: {
      fontSize: 16,
      color: '#cefff5',
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
    let merge: EChartOptions = this.getEChartsMerge(datas);
    this.config.line = undefined;
    this.config.bar = undefined;

    this.config.bar = new ChartConfig(
      this.begin,
      this.end,
      this.echartsLegend,
      merge
    );
  }

  private getEChartsMerge(datas: ITimeDataGroup<number>[]): EChartOptions {
    let width = 20;

    return {
      series: datas.map((data, i) => {
        return {
          type: 'bar',
          name: data.Name,
          data: data.datas.map((x) => x.value),
          barWidth: `${width}px`,
          barMinHeight: 5,
          label: {
            show: true,
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
interface Config {
  line: any;
  bar: any;
}

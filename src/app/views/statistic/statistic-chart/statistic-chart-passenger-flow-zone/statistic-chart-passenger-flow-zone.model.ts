import {
  BarSeriesOption,
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { XAXisOption } from 'echarts/types/dist/shared';
import { EChartsTheme } from 'src/app/enums/echarts-theme.enum';

export type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | XAXisOption
>;

export class ChartConfig {
  constructor(
    begin: number,
    end: number,
    legend?: LegendComponentOption,
    merge?: EChartOptions
  ) {
    this.options = this.getOption(begin, end, legend);
    this.merge = merge || {};
  }

  static color = [
    '#00dc78',
    '#29a5f9',

    '#f46855',
    '#01edf5',
    '#ffba3b',
    '#21E452',
  ];
  options: EChartOptions;

  merge: EChartOptions;
  theme: EChartsTheme = EChartsTheme.adsame;

  private font = {
    fontFamily: 'Howell Light',
    show: true,
    color: '#fff',
    fontSize: 16,
  };

  getOption(
    begin: number,
    end: number,
    legend?: LegendComponentOption
  ): EChartOptions {
    let x = this.getX(begin, end);
    return {
      color: ChartConfig.color,
      legend: legend,
      grid: {
        bottom: 0,
      },
      title: {
        show: true,
      },
      tooltip: {},
      xAxis: x,
      yAxis: {
        show: false,
        type: 'value',
        minInterval: 1,
        axisLabel: this.font,
      },
    };
  }

  getX(begin: number, end: number): XAXisOption | undefined {
    let datas = [];
    for (let i = 0; i <= end - begin; i++) {
      datas.push((i + begin).toString().padStart(2, '0') + ':00');
    }

    return {
      mainType: 'xAxis',
      type: 'category',
      axisLabel: this.font,
      axisLine: {
        lineStyle: {
          color: '#07a990',
        },
      },
      axisTick: {
        show: false,
      },

      data: [...datas],
    };
  }
}

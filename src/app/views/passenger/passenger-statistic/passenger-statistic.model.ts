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
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { Duration } from 'src/app/models/duration.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';

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
    unit: TimeUnit,
    date: Date,
    legend?: LegendComponentOption,
    merge?: EChartOptions
  ) {
    this.options = this.getOption(unit, date, legend);
    this.merge = merge || {};
  }

  static color = ['#00dc78', '#29a5f9', '#21E452'];
  options: EChartOptions;

  merge: EChartOptions;
  theme: EChartsTheme = EChartsTheme.adsame;

  private font = {
    fontFamily: 'Howell Light',
    show: true,
    color: '#fff',
    fontSize: 24,
  };

  getOption(
    unit: TimeUnit,
    date: Date,
    legend?: LegendComponentOption
  ): EChartOptions {
    let x = this.getX(unit, date);
    return {
      color: ChartConfig.color,
      legend: legend,
      grid: {
        bottom: 40,
      },
      title: {
        show: true,
      },
      tooltip: {},
      xAxis: x,
      yAxis: {
        type: 'value',
        axisLabel: this.font,
      },
    };
  }

  getX(unit: TimeUnit, date: Date): XAXisOption | undefined {
    let interval: Duration;
    switch (unit) {
      case TimeUnit.Hour:
        return {
          mainType: 'xAxis',
          type: 'category',
          axisLabel: this.font,
          axisTick: {
            show: false,
          },
          data: [
            ...Array.from(
              { length: 15 },
              (v, i) => (i + 8).toString().padStart(2, '0') + ':00'
            ),
          ],
        };
      case TimeUnit.Month:
        interval = DateTimeTool.allMonth(date);

        return {
          mainType: 'xAxis',
          type: 'category',
          axisLabel: this.font,

          data: [
            ...Array.from(
              {
                length: interval.end.getDate() - interval.begin.getDate() + 1,
              },
              (v, i) => (i + 1).toString() + '日'
            ),
          ],
        };
      case TimeUnit.Week:
        interval = DateTimeTool.allWeek(date);

        return {
          mainType: 'xAxis',
          type: 'category',
          axisLabel: this.font,
          data: [...Array.from({ length: 7 }, (v, i) => Language.Week(i + 1))],
        };
      default:
        break;
    }
    return undefined;
  }
}



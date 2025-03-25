import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { StatisticChartAbstract } from '../statistic-chart.abstract';
import { StatisticChartLineEChartOption } from './statistic-chart-line-echart.option';
import { IStatisticChartLineColor } from './statistic-chart-line.model';

@Component({
  selector: 'howell-statistic-chart-line',
  templateUrl: './statistic-chart-line.component.html',
  styleUrls: ['./statistic-chart-line.component.less'],
})
export class StatisticChartLineComponent
  extends StatisticChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() color: IStatisticChartLineColor = { r: 0, g: 0, b: 0 };
  @Input() datas: number[] = [40, 60, 55, 50, 55, 65, 45];
  @Input() xAxis: string[] = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  constructor() {
    super();
  }

  option = StatisticChartLineEChartOption;
  count = 0;

  @ViewChild('chart') element?: ElementRef;

  ngOnInit(): void {
    this.load();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy() {
    this.destroy();
  }

  private load() {
    this.chart.get().then((chart) => {
      this.set.color(this.color);
      (this.option.xAxis as any).data = [...this.xAxis];
      (this.option.series as any)[0].data = [...this.datas];
      this.count = this.datas.reduce((a, b) => a + b, 0);
      chart.setOption(this.option);
    });
  }

  private set = {
    color: (rgb: IStatisticChartLineColor) => {
      this.option.series[0].lineStyle.color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      this.option.series[0].areaStyle.color.colorStops[0].color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
      this.option.series[0].areaStyle.color.colorStops[1].color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`;
      this.option.series[0].markPoint.itemStyle.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    },
  };
}

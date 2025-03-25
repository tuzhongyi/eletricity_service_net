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
import { StatisticChartDeviceStateEchartOption } from './statistic-chart-device-state-echart.option';
import { StatisticChartDeviceStateData } from './statistic-chart-device-state.model';

@Component({
  selector: 'howell-statistic-chart-device-state',
  templateUrl: './statistic-chart-device-state.component.html',
  styleUrls: ['./statistic-chart-device-state.component.less'],
})
export class StatisticChartDeviceStateComponent
  extends StatisticChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input('data') data = new StatisticChartDeviceStateData();

  constructor() {
    super();
  }

  @ViewChild('chart') element?: ElementRef;
  option = StatisticChartDeviceStateEchartOption;

  ngOnInit(): void {
    this.load();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.load();
    }
  }

  ngAfterViewInit() {
    this.view();
  }

  ngOnDestroy() {
    this.destroy();
  }

  private load() {
    this.chart.get().then((chart) => {
      this.set.ratio(this.data);
      this.set.value(this.data);
      chart.setOption(this.option);
    });
  }

  private set = {
    ratio: (data: StatisticChartDeviceStateData) => {
      let count = data.online + data.offline;
      let ratio = 100;
      if (count > 0) {
        ratio = (data.online / count) * 100;
      }

      this.option.series[0].data[0].value = ratio;
      this.option.series[1].data[0].value = ratio;
    },
    value: (data: StatisticChartDeviceStateData) => {
      this.option.series[2].data[0].value = data.online;
      this.option.series[2].data[1].value = data.offline;
      this.option.series[3].data[0].value = data.online;
      this.option.series[3].data[1].value = data.offline;
    },
  };
}

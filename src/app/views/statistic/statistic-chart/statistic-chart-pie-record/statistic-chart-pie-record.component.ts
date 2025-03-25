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
import { EventType } from 'src/app/enums/event-type.enum';
import { Language } from 'src/app/tools/language';
import { StatisticChartAbstract } from '../statistic-chart.abstract';
import { StatisticChartPieRecordEchartOption } from './statistic-chart-pie-record-echart.option';
import { StatisticChartPieRecordData } from './statistic-chart-pie-record.model';

@Component({
  selector: 'howell-statistic-chart-pie-record',
  templateUrl: './statistic-chart-pie-record.component.html',
  styleUrls: ['./statistic-chart-pie-record.component.less'],
})
export class StatisticChartPieRecordComponent
  extends StatisticChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: StatisticChartPieRecordData[] = [
    {
      value: 2,
      type: EventType.LeavePosition,
      name: Language.EventType(EventType.LeavePosition),
      color: { r: 210, g: 236, b: 81 },
    },
    {
      value: 2,
      type: EventType.Falldown,
      name: Language.EventType(EventType.Falldown),
      color: { r: 54, g: 122, b: 224 },
    },
    {
      value: 6,
      type: EventType.Loitering,
      name: Language.EventType(EventType.Loitering),
      color: { r: 67, g: 200, b: 82 },
    },
    {
      value: 4,
      type: EventType.Voilence,
      name: Language.EventType(EventType.Voilence),
      color: { r: 216, g: 80, b: 80 },
    },
    {
      value: 6,
      type: EventType.Run,
      name: Language.EventType(EventType.Run),
      color: { r: 66, g: 218, b: 220 },
    },
    {
      value: 12,
      type: EventType.HighDensity,
      name: Language.EventType(EventType.HighDensity),
      color: { r: 145, g: 91, b: 255 },
    },
    {
      value: 18,
      type: EventType.Business,
      name: Language.EventType(EventType.Business),
      color: { r: 216, g: 117, b: 70 },
    },
    {
      value: 2,
      type: EventType.Unattended,
      name: Language.EventType(EventType.Unattended),
      color: { r: 46, g: 139, b: 255 },
    },
  ];
  constructor() {
    super();
  }

  @ViewChild('chart') element?: ElementRef;
  option = StatisticChartPieRecordEchartOption;

  ngOnInit(): void {
    this.load();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas'] && !changes['datas'].firstChange) {
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
      this.set.value(this.datas);
      chart.setOption(this.option);
    });
  }

  private set = {
    value: (datas: StatisticChartPieRecordData[]) => {
      for (let i = 0; i < this.option.series.length; i++) {
        this.option.series[i].data = datas.map((x) => {
          return {
            value: x.value,
            name: x.name,
            itemStyle: {
              color: `rgba(${x.color.r}, ${x.color.g}, ${x.color.b}, ${
                i === 0 ? 0.5 : 1
              })`,
            },
          };
        });
      }
    },
  };
}

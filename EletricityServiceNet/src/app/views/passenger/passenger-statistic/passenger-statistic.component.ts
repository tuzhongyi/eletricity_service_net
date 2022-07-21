import { Component, Input, OnInit } from '@angular/core';
import { LegendComponentOption } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { ChartType } from 'src/app/enums/chart-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { Duration } from 'src/app/models/duration.model';
import { IModel } from 'src/app/models/model.interface';
import { SelectItem } from 'src/app/models/select-item.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { PassengerStatisticBusiness } from './passenger-statistic.business';
import { ChartConfig, EChartOptions } from './passenger-statistic.model';

@Component({
  selector: 'howell-passenger-statistic',
  templateUrl: './passenger-statistic.component.html',
  styleUrls: ['./passenger-statistic.component.less'],
  providers: [PassengerStatisticBusiness],
})
export class PassengerStatisticComponent
  implements IComponent<IModel, ITimeDataGroup<number>[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, ITimeDataGroup<number>[]>;
  constructor(business: PassengerStatisticBusiness) {
    this.business = business;
    this.duration = DateTimeTool.allDay(new Date());
  }
  datas: ITimeDataGroup<number>[] = [];
  duration: Duration;
  DateTimePickerView = DateTimePickerView;

  unit: TimeUnit = TimeUnit.Hour;
  units: SelectItem<TimeUnit>[] = [];
  chart: ChartType = ChartType.bar;
  ChartType = ChartType;
  charts: SelectItem<ChartType>[] = [];
  config: Config = { bar: {}, line: {}, datetime: new DateTimeConfig() };
  echartsLegend: LegendComponentOption = {
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

  ngOnInit(): void {
    this.initTimeUnits();
    this.initChartTypes();
    this.loadData();
  }

  initTimeUnits() {
    this.units.push({ value: TimeUnit.Hour, language: '日报表' });
    this.units.push({ value: TimeUnit.Week, language: '周报表' });
    this.units.push({ value: TimeUnit.Month, language: '月报表' });
  }
  initChartTypes() {
    this.charts.push({ value: ChartType.bar, language: '柱状图' });
    this.charts.push({ value: ChartType.line, language: '折线图' });
  }

  changeBegin(date: Date) {
    this.duration.begin = date;
  }
  changeEnd(date: Date) {
    this.duration.end = date;
  }

  changeTimeUnit(event: Event) {
    let item = event.target as HTMLSelectElement;
    this.unit = parseInt(item.value);
    switch (this.unit) {
      case TimeUnit.Hour:
        this.duration = DateTimeTool.allDay(new Date());
        this.config.datetime.format = 'yyyy-MM-dd HH:mm';
        this.config.datetime.min = DateTimePickerView.day;
        break;
      case TimeUnit.Week:
        this.duration = DateTimeTool.allWeek(new Date());
        this.config.datetime.format = 'yyyy-MM-dd';
        this.config.datetime.min = DateTimePickerView.month;
        break;
      case TimeUnit.Month:
        this.duration = DateTimeTool.allMonth(new Date());
        this.config.datetime.format = 'yyyy-MM-dd';
        this.config.datetime.min = DateTimePickerView.month;
        break;
      default:
        break;
    }
    this.loadData();
  }
  changeChart(event: Event) {
    let item = event.target as HTMLSelectElement;
    this.chart = item.value as ChartType;
    this.loadChart(this.datas);
  }

  async loadData() {
    let unit = this.unit;
    if (this.unit === TimeUnit.Week) {
      unit = TimeUnit.Day;
    }
    this.datas = await this.business.load(unit, this.duration);
    this.loadChart(this.datas);
  }
  loadChart(datas: ITimeDataGroup<number>[]) {
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

  search() {
    this.loadData();
  }

  getEChartsMerge(
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
              areaStyle: {},
              label: {
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            };
          }),
        };
      case ChartType.bar:
      default:
        let width = 30;
        if (this.unit === TimeUnit.Month) {
          width = 15;
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
                formatter: (params: CallbackDataParams) => {
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
  datetime: DateTimeConfig;
}

class DateTimeConfig {
  min: DateTimePickerView = DateTimePickerView.day;
  format = 'yyyy-MM-dd HH:mm';
}

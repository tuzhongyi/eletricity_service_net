import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LegendComponentOption } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { TimeDataGroupExportConverter } from 'src/app/converters/exports/time-data-group-export.converter';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { ChartType } from 'src/app/enums/chart-type.enum';
import { ExportType } from 'src/app/enums/export-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IComponent,
  IExportComponent,
} from 'src/app/interfaces/component.interfact';
import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { Duration } from 'src/app/models/duration.model';
import { IModel } from 'src/app/models/model.interface';
import { SelectItem } from 'src/app/models/select-item.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { ExportTool } from 'src/app/tools/export.tool';
import { PassengerStatisticExportBusiness } from './passenger-statistic-export.business';
import { PassengerStatisticBusiness } from './passenger-statistic.business';
import { ChartConfig, EChartOptions } from './passenger-statistic.model';

@Component({
  selector: 'howell-passenger-statistic',
  templateUrl: './passenger-statistic.component.html',
  styleUrls: ['./passenger-statistic.component.less'],
  providers: [PassengerStatisticBusiness, PassengerStatisticExportBusiness],
})
export class PassengerStatisticComponent
  implements IComponent<IModel, ITimeDataGroup<number>[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, ITimeDataGroup<number>[]>;
  @Input()
  chart: ChartType = ChartType.bar;
  @Input()
  title: string = '客流统计';
  constructor(
    business: PassengerStatisticBusiness,
    private exports: PassengerStatisticExportBusiness
  ) {
    this.business = business;
    this.duration = DateTimeTool.allDay(this.date);
  }

  datas: ITimeDataGroup<number>[] = [];
  date: Date = new Date();
  duration: Duration;
  DateTimePickerView = DateTimePickerView;

  unit: TimeUnit = TimeUnit.Hour;
  units: SelectItem<TimeUnit>[] = [];

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

  changeDate(date: Date) {
    this.date = date;
    this.duration = DateTimeTool.TimeUnit(this.unit, this.date);
  }

  changeTimeUnit(event: Event) {
    switch (this.unit) {
      case TimeUnit.Hour:
        this.duration = DateTimeTool.allDay(this.date);
        this.config.datetime.format = 'yyyy-MM-dd';
        this.config.datetime.min = DateTimePickerView.month;
        this.config.datetime.week = false;
        break;
      case TimeUnit.Week:
        this.duration = DateTimeTool.allWeek(this.date);
        this.config.datetime.format = 'yyyy-MM-dd';
        this.config.datetime.min = DateTimePickerView.month;
        this.config.datetime.week = true;
        break;
      case TimeUnit.Month:
        this.duration = DateTimeTool.allMonth(this.date);
        this.config.datetime.format = 'yyyy-MM';
        this.config.datetime.min = DateTimePickerView.year;
        this.config.datetime.week = false;
        break;
      default:
        break;
    }
    this.loadData();
  }
  changeChart(event: Event) {
    this.loadChart(this.datas);
  }

  async loadData() {
    let unit = this.unit;
    // if (this.unit === TimeUnit.Week || this.unit === TimeUnit.Month) {
    //   unit = TimeUnit.Day;
    // }
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
              smooth: true,
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
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            };
          }),
        };
    }
  }

  exportExcel() {
    this.exports.Export(
      ExportType.excel,
      this.datas,
      this.title,
      this.date,
      this.unit
    );
  }
}

interface Config {
  line: any;
  bar: any;
  datetime: DateTimeConfig;
}

class DateTimeConfig {
  min: DateTimePickerView = DateTimePickerView.month;
  format = 'yyyy-MM-dd';
  week: boolean = false;
}

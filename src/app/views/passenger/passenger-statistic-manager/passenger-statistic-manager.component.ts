import { Component, Input, OnInit } from '@angular/core';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { ChartType } from 'src/app/enums/chart-type.enum';
import { ExportType } from 'src/app/enums/export-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Duration } from 'src/app/models/duration.model';
import { IModel } from 'src/app/models/model.interface';
import { SelectItem } from 'src/app/models/select-item.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { PassengerStatisticManagerExportBusiness } from './business/passenger-statistic-export.business';
import { PassengerStatisticManagerBusiness } from './business/passenger-statistic.business';

@Component({
  selector: 'howell-passenger-statistic-manager',
  templateUrl: './passenger-statistic-manager.component.html',
  styleUrls: ['./passenger-statistic-manager.component.less'],
  providers: [
    PassengerStatisticManagerBusiness,
    PassengerStatisticManagerExportBusiness,
  ],
})
export class PassengerStatisticManagerComponent implements OnInit {
  @Input()
  business: IBusiness<IModel, ITimeDataGroup<number>[]>;
  @Input()
  chart: ChartType = ChartType.bar;
  @Input()
  title: string = '客流统计';
  constructor(
    business: PassengerStatisticManagerBusiness,
    private exports: PassengerStatisticManagerExportBusiness
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
  config: Config = { datetime: new DateTimeConfig() };

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

  async loadData() {
    let unit = this.unit;
    this.datas = await this.business.load(unit, this.duration);
  }

  search() {
    this.loadData();
  }

  exportExcel() {
    this.exports.Export(
      ExportType.chart,
      this.datas,
      this.title,
      this.date,
      this.unit
    );
  }
}
interface Config {
  datetime: DateTimeConfig;
}

class DateTimeConfig {
  min: DateTimePickerView = DateTimePickerView.month;
  format = 'yyyy-MM-dd';
  week: boolean = false;
}

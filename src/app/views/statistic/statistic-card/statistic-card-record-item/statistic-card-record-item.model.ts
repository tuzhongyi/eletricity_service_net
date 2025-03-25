import { IStatisticChartLineColor } from '../../statistic-chart/statistic-chart-line/statistic-chart-line.model';

export interface StatisticCardRecordItemModel {
  count: number;
  color: IStatisticChartLineColor;
  xAxis: string[];
  datas: number[];
}

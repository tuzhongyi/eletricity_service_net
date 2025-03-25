import { IStatisticChartLineColor } from '../../statistic-chart/statistic-chart-line/statistic-chart-line.model';

export interface StatisticCardPassengerFlowModel {
  title: string;
  count: number;
  color: IStatisticChartLineColor;
  xAxis: string[];
  datas: number[];
}

export enum StatisticCardPassengerFlowType {
  in,
  out,
}

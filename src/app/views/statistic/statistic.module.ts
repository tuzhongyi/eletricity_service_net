import { StatisticComponent } from './component/statistic.component';
import { StatisticCardComponents } from './statistic-card/statistic-card.module';
import { StatisticChartComponents } from './statistic-chart/statistic-chart.module';

export const StatisticComponents = [
  StatisticComponent,
  ...StatisticCardComponents,
  ...StatisticChartComponents,
];

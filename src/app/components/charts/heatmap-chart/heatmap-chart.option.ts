import { EChartsOption } from 'echarts';

export const HeatmapChartOptions: EChartsOption = {
  animation: false,
  geo: [
    {
      map: 'sicily',
      roam: true,
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      selectedMode: false,
    },
  ],
  grid: {
    top: 10,
    left: 'center',
    width: 180,
    height: 520,
  },
  visualMap: {
    show: false,
    top: 'top',
    min: 0,
    max: 4,
    seriesIndex: 0,
    calculable: true,
    inRange: {
      color: ['blue', 'green', 'yellow', 'red'],
    },
  },
  series: [
    {
      type: 'heatmap',
      coordinateSystem: 'geo',
      data: [],
      pointSize: 5,
      blurSize: 6,
    },
  ],
};

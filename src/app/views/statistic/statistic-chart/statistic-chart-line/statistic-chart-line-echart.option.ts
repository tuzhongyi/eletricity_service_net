export const StatisticChartLineEChartOption: any = {
  grid: {
    left: '10px',
    right: '10px',
    bottom: '0%',
    top: '25px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: [],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#07a990',
      },
    },
    axisLabel: {
      color: '#ffffff',
      fontFamily: 'howell light',
      interval: 0, //5,
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisLine: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: '#ffffff30',
      },
    },
    splitNumber: 3,
    axisLabel: {
      show: false,
      color: '#ffffff80',
      fontFamily: 'howell light',
    },
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
      symbol: 'none',

      lineStyle: {
        color: 'rgba(0,255,255,1)',
        width: 2,
      },
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,255,255,0.3)',
            },
            {
              offset: 1,
              color: 'rgba(0,255,255,0)',
            },
          ],
        },
      },
      markPoint: {
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#183B3F',
          borderColor: 'rgba(0,255,255,1)',
          borderWidth: 2,
        },
        label: {
          offset: [0, -15],
          color: '#fff',
        },
        data: [{ type: 'max', name: 'Max' }],
      },
    },
  ],
};

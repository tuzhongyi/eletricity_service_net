export const StatisticChartPieRecordEchartOption: any = {
  series: [
    {
      type: 'pie',
      z: 2,
      radius: ['65%', '95%'],
      avoidLabelOverlap: false,
      silent: true,
      padAngle: 2,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 2, name: '离岗' },
        { value: 2, name: '倒地' },
        { value: 6, name: '滞留/徘徊' },
        { value: 4, name: '剧烈运动' },
        { value: 6, name: '人员奔跑' },
        { value: 12, name: '人员聚集' },
        { value: 18, name: '递交材料' },
        { value: 2, name: '遗留物品' },
      ],
    },
    {
      type: 'pie',
      z: 1,
      radius: ['55%', '65%'],
      avoidLabelOverlap: false,
      silent: true,
      padAngle: 2,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 2, name: '离岗' },
        { value: 2, name: '倒地' },
        { value: 6, name: '滞留/徘徊' },
        { value: 4, name: '剧烈运动' },
        { value: 6, name: '人员奔跑' },
        { value: 12, name: '人员聚集' },
        { value: 18, name: '递交材料' },
        { value: 2, name: '遗留物品' },
      ],
    },
  ],
};

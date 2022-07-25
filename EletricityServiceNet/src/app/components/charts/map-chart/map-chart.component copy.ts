// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   OnInit,
//   ViewChild,
// } from '@angular/core';

// import * as echarts from 'echarts';
// import { EChartsOption } from 'echarts';

// declare let $: any;

// @Component({
//   selector: 'howell-map-chart',
//   templateUrl: './map-chart.component.html',
//   styleUrls: ['./map-chart.component.less'],
// })
// export class MapChartComponent implements OnInit, AfterViewInit {
//   constructor() {}

//   option?: EChartsOption;
//   echarts?: echarts.ECharts;
//   @ViewChild('echarts')
//   element?: ElementRef<HTMLDivElement>;

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     if (this.element) {
//       this.echarts = echarts.init(this.element.nativeElement);
//       this.init();
//     }
//   }

//   init() {
//     $.get('assets/images/test.svg', (svg: any) => {
//       echarts.registerMap('sicily', { svg: svg });
//       this.option = {
//         // -------------
//         // Make buttons
//         geo: [
//           {
//             map: 'sicily',
//             roam: true,
//             layoutCenter: ['50%', '50%'],
//             layoutSize: '100%',
//             selectedMode: 'single',
//           },
//         ],
//         grid: {
//           top: 10,
//           left: 'center',
//           width: 180,
//           height: 520,
//         },
//         xAxis: {
//           axisLine: { show: false },
//           splitLine: { show: false },
//           axisLabel: { show: false },
//           axisTick: { show: false },
//         },
//         yAxis: {
//           axisLine: { show: false },
//           splitLine: { show: false },
//           axisLabel: { show: false },
//           axisTick: { show: false },
//         },

//         // Make buttons end
//         // -----------------
//       };
//       if (!this.echarts) return;
//       this.echarts.setOption(this.option);
//     });
//   }
// }

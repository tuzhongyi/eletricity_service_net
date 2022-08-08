import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';

export class RealtimeHeatmapModel<T = any> {
  url: string = '';
  floorName: string = '';
  floorId: string = '';
  points: IPoint[] = [];
  data?: T;
}

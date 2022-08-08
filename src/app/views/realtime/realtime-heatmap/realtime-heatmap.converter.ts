import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Floor } from 'src/app/models/floor.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { RealtimeHeatmapModel } from './realtime-heatmap.model';

export class RealtimeHeatmapFloorArrayConverter
  implements IPromiseConverter<Floor[], RealtimeHeatmapModel[]>
{
  item = new RealtimeHeatmapFloorConverter();
  async Convert(
    source: Floor[],
    getter: {
      point: (id: string) => Promise<IPoint[]>;
      base64: (id: string) => Promise<string>;
    }
  ): Promise<RealtimeHeatmapModel[]> {
    let models: RealtimeHeatmapModel[] = [];
    for (let i = 0; i < source.length; i++) {
      const floor = source[i];
      let item = await this.item.Convert(floor, getter);
      models.push(item);
    }
    return models;
  }
}

export class RealtimeHeatmapFloorConverter
  implements IPromiseConverter<Floor, RealtimeHeatmapModel>
{
  async Convert(
    source: Floor,
    getter: {
      point: (id: string) => Promise<IPoint[]>;
      base64: (id: string) => Promise<string>;
    }
  ): Promise<RealtimeHeatmapModel> {
    let model = new RealtimeHeatmapModel();
    model.data = source;
    model.floorId = source.Id;
    model.points = await getter.point(model.floorId);
    if (source.PlanUrl) {
      model.url = await getter.base64(source.PlanUrl);
    }
    return model;
  }
}

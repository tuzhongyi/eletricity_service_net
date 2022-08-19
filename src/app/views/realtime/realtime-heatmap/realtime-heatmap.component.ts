import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { Camera } from 'src/app/models/camera.model';
import { IModel } from 'src/app/models/model.interface';
import { Position } from 'src/app/models/position.model';
import { RealtimeHeatmapCameraBusniess } from './business/realtime-heatmap-camera.business';
import { RealtimeHeatmapFloorBusniess } from './business/realtime-heatmap-floor.business';
import { RealtimeHeatmapBusniess } from './realtime-heatmap.business';
import { RealtimeHeatmapModel } from './realtime-heatmap.model';

@Component({
  selector: 'howell-realtime-heatmap',
  templateUrl: './realtime-heatmap.component.html',
  styleUrls: ['./realtime-heatmap.component.less'],
  providers: [
    RealtimeHeatmapBusniess,
    RealtimeHeatmapFloorBusniess,
    RealtimeHeatmapCameraBusniess,
  ],
})
export class RealtimeHeatmapComponent
  implements IComponent<IModel, RealtimeHeatmapModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, RealtimeHeatmapModel<any>[]>;
  @Output()
  pointClick: EventEmitter<Camera> = new EventEmitter();

  constructor(business: RealtimeHeatmapBusniess) {
    this.business = business;
  }

  data: RealtimeHeatmapModel[] = [];
  selected?: RealtimeHeatmapModel;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.data = await this.business.load();
    if (this.data.length > 0) {
      if (!this.selected) {
        this.selected = this.data[0];
      }
    }
  }

  onPointClick(point: IPoint) {
    if (this.selected) {
      let source = this.selected.points.find((x) => x.id === point.id);
      if (source) {
        this.pointClick.emit(source.data);
      }
    }
  }
}

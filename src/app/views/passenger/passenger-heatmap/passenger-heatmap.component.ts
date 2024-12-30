import { Component, EventEmitter, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { Floor } from 'src/app/models/floor.model';
import { HeatMapPoint } from 'src/app/models/heat-map-point.model';
import { PassengerHeatmapBusiness } from './passenger-heatmap.business';
import { PassengerHeatmapArgs } from './passenger-heatmap.model';

@Component({
  selector: 'howell-passenger-heatmap',
  templateUrl: './passenger-heatmap.component.html',
  styleUrls: ['./passenger-heatmap.component.less'],
  providers: [PassengerHeatmapBusiness],
})
export class PassengerHeatmapComponent implements OnInit {
  constructor(private business: PassengerHeatmapBusiness) {}

  args = new PassengerHeatmapArgs();
  DateTimePickerView = DateTimePickerView;
  floors: Floor[] = [];
  floor?: Floor;
  url?: string;
  datas: HeatMapPoint[] = [];
  load = new EventEmitter<HeatMapPoint[]>();

  ngOnInit(): void {
    this.initFloors();
  }

  loadData() {
    this.business.getData(this.args).then((maps) => {
      let datas = [];
      for (let i = 0; i < maps.length; i++) {
        let item = maps[i];
        if (item.Points) {
          datas.push(...item.Points);
        }
      }
      this.datas = datas;
      this.load.emit(datas);
    });
  }

  async initFloors() {
    this.floors = await this.business.getFloors();
    if (this.floors.length > 0) {
      this.floor = this.floors[0];
      // this.args.floorId = this.floor.Id;
      // if (this.floor.PlanUrl) {
      //   this.url = await this.business.image(this.floor.PlanUrl);
      // }
      this.changeFloor();
    }
  }
  changeFloor() {
    if (this.floor) {
      if (this.args.floorId === this.floor.Id) return;
      this.args.floorId = this.floor.Id;
      if (this.floor.PlanUrl) {
        this.business.image(this.floor.PlanUrl).then((x) => {
          this.url = x;
        });
      }
    }
  }
  onsearch() {
    this.loadData();
  }
}

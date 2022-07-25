import { Component, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { Duration } from 'src/app/models/duration.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { PassengerHeatmapBusiness } from './passenger-heatmap.business';

@Component({
  selector: 'howell-passenger-heatmap',
  templateUrl: './passenger-heatmap.component.html',
  styleUrls: ['./passenger-heatmap.component.less'],
  providers: [PassengerHeatmapBusiness],
})
export class PassengerHeatmapComponent implements OnInit {
  constructor(private business: PassengerHeatmapBusiness) {
    this.duration = DateTimeTool.allDay(new Date());
  }

  duration: Duration;
  DateTimePickerView = DateTimePickerView;
  floors: SelectItem<string>[] = [];
  floor?: SelectItem<string>;

  ngOnInit(): void {
    this.initFloors();
  }

  async initFloors() {
    let floors = await this.business.getFloors();
    if (!floors) return;

    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      this.floors.push({ value: floor.Id, language: floor.Name ?? '' });
    }
  }

  changeBegin(date: Date) {
    this.duration.begin = date;
  }
  changeEnd(date: Date) {
    this.duration.end = date;
  }
  changeFloor(event: Event) {
    let select = event.target as HTMLSelectElement;
  }
}

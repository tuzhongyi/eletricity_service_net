import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { EventType } from 'src/app/enums/event-type.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { SelectItem } from 'src/app/models/select-item.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { RecordEventTableOptions } from '../tables/record-event-table/record-event-table.model';
import { RecordBusiness } from './record.business';

@Component({
  selector: 'howell-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
  providers: [RecordBusiness],
})
export class RecordComponent implements OnInit {
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(private business: RecordBusiness) {}

  options: RecordEventTableOptions = {
    begin: new Date(),
    end: new Date(),
    name: '',
    pageIndex: 1,
    pageSize: 10,
  };

  DateTimePickerView = DateTimePickerView;

  eventTypes: SelectItem<number>[] = [];
  floors: SelectItem<string>[] = [];
  floor?: SelectItem<string>;
  load: EventEmitter<RecordEventTableOptions> = new EventEmitter();
  exportExcel: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    let duration = DateTimeTool.allDay(new Date());
    this.options.begin = duration.begin;
    this.options.end = duration.end;

    this.initEventTypes();
    this.initFloors();
  }

  async initFloors() {
    let _default = { value: '', language: '全部' };
    this.floors.push(_default);
    this.floor = _default;
    let floors = await this.business.getFloors();
    if (!floors) return;

    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      this.floors.push({ value: floor.Id, language: floor.Name ?? '' });
    }
  }

  initEventTypes() {
    this.eventTypes.push({ value: 0, language: '全部' });

    for (const key in EventType) {
      let value = parseInt(EventType[key]);
      if (Number.isNaN(value)) continue;
      this.eventTypes.push({
        value: value,
        language: Language.EventType(value),
      });
    }
  }

  floorChange(event: Event) {
    let select = event.target as HTMLSelectElement;
    this.options.floor = select.value;
  }

  changeType(event: Event) {
    let select = event.target as HTMLSelectElement;
    if (select.value) {
      this.options.type = parseInt(select.value);
    } else {
      this.options.type = undefined;
    }
  }

  onSearch() {
    this.options.pageIndex = 1;
    this.load.emit(this.options);
  }

  onPicture(model: PictureArgs) {
    this.picture.emit(model);
  }
  onPlayback(model: VideoArgs) {
    this.playback.emit(model);
  }

  onExport() {
    this.exportExcel.emit();
  }
}

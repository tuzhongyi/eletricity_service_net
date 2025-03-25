import { Component, EventEmitter, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { EventType } from 'src/app/enums/event-type.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { SelectItem } from 'src/app/models/select-item.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { RecordEventTableOptions } from '../tables/record-event-table/record-event-table.model';
import { RecordWindow } from './controller/record-window.controller';
import { RecordBusiness } from './record.business';

@Component({
  selector: 'howell-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
  providers: [RecordBusiness, RecordWindow],
})
export class RecordComponent implements OnInit {
  constructor(private business: RecordBusiness, public window: RecordWindow) {}

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

  async onPicture(model: PictureArgs) {
    this.window.picture.title = model.title;
    let result = await Medium.img(model.id);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;
    this.window.picture.show = true;
  }
  onPlayback(args: VideoArgs) {
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.begin = args.begin;
    this.window.video.end = args.end;
    this.window.video.mode = args.mode;
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }

  onExport() {
    this.exportExcel.emit();
  }
}

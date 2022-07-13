import { Component, EventEmitter, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { EventType } from 'src/app/enums/event-type.enum';
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
  constructor(private business: RecordBusiness) {}

  options: RecordEventTableOptions = {
    begin: new Date(),
    end: new Date(),
    name: '',
    pageIndex: -1,
    pageSize: 10,
  };

  DateTimePickerView = DateTimePickerView;

  eventTypes: SelectItem<number>[] = [];
  floors: SelectItem<string>[] = [];
  floor?: SelectItem<string>;
  load: EventEmitter<RecordEventTableOptions> = new EventEmitter();

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
    this.eventTypes.push({
      value: EventType.Business,
      language: Language.EventType(EventType.Business),
    });
    this.eventTypes.push({
      value: EventType.Falldown,
      language: Language.EventType(EventType.Falldown),
    });
    this.eventTypes.push({
      value: EventType.LeavePosition,
      language: Language.EventType(EventType.LeavePosition),
    });
    this.eventTypes.push({
      value: EventType.Loitering,
      language: Language.EventType(EventType.Loitering),
    });
    this.eventTypes.push({
      value: EventType.Offline,
      language: Language.EventType(EventType.Offline),
    });
    this.eventTypes.push({
      value: EventType.Online,
      language: Language.EventType(EventType.Online),
    });
    this.eventTypes.push({
      value: EventType.Spacing,
      language: Language.EventType(EventType.Spacing),
    });
    this.eventTypes.push({
      value: EventType.Voilence,
      language: Language.EventType(EventType.Voilence),
    });
  }

  changeBegin(date: Date) {
    this.options.begin = date;
  }
  changeEnd(date: Date) {
    this.options.end = date;
  }

  floorChange(event: Event) {
    let select = event.target as HTMLSelectElement;
    this.options.floor = select.value;
  }
  onsearch() {
    this.load.emit(this.options);
  }
}

class SelectItem<T> {
  value!: T;
  language: string = '';
}

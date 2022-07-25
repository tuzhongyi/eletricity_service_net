import { Component, EventEmitter, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { EventType } from 'src/app/enums/event-type.enum';

@Component({
  selector: 'howell-realtime-record-list',
  templateUrl: './realtime-record-list.component.html',
  styleUrls: ['./realtime-record-list.component.less'],
})
export class RealtimeRecordListComponent implements OnInit {
  constructor() {}
  EventType = EventType;
  ngOnInit(): void {
    interval(60 * 1000).subscribe((x) => {
      this.load.emit();
    });
  }

  types?: EventType[];
  type?: EventType;
  load: EventEmitter<EventType[]> = new EventEmitter();

  eventFilter(type?: EventType) {
    this.type = type;
    switch (type) {
      case EventType.Business:
        this.types = [
          EventType.Business,
          EventType.Falldown,
          EventType.LeavePosition,
          EventType.Loitering,
          EventType.Spacing,
          EventType.Voilence,
          EventType.Run,
          EventType.HighDensity,
        ];
        break;
      case EventType.Offline:
        this.types = [EventType.Online, EventType.Offline];
        break;
      default:
        this.types = undefined;
        break;
    }
    this.load.emit(this.types);
  }
}

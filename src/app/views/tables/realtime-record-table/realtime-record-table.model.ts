import { EventType } from 'src/app/enums/event-type.enum';

export class RealtimeRecordModel<T = any> {
  id: string = '';
  name: string = '';
  floor: string = '';
  event!: EventType;
  time: string = '';
  hasPic: boolean = false;
  data?: T;
}

import { EventType } from 'src/app/enums/event-type.enum';

export class RealtimeRecordModel {
  id: string = '';
  name: string = '';
  floor: string = '';
  event!: EventType;
  time: string = '';
}

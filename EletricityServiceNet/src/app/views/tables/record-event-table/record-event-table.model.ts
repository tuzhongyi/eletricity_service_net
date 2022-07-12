import { EventType } from 'src/app/enums/event-type.enum';

export class RecordEventTableItemModel<T = any> {
  id: string = '';
  name: string = '';
  zone: string = '';
  type: string = '';
  datetime: string = '';
  data?: T;
}
export interface RecordEventTableOptions {
  begin: Date;
  end: Date;
  floor?: string;
  type?: EventType;
  name: string;
}

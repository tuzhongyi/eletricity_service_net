import { EventType } from 'src/app/enums/event-type.enum';
import { Page } from 'src/app/models/page.model';

export class RecordEventTableItemModel<T = any> {
  id: string = '';
  name: string = '';
  floor: string = '';
  zone: string = '';
  type: string = '';
  datetime: string = '';
  hasPic: boolean = false;
  description: string = '';
  data?: T;
}
export interface RecordEventTableOptions {
  begin: Date;
  end: Date;
  floor?: string;
  type?: EventType;
  name: string;
  pageIndex: number;
  pageSize: number;
}

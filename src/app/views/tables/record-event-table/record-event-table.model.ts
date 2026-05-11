import { EventType } from 'src/app/enums/event-type.enum';

export class RecordEventTableItemModel<T = any> {
  id: string = '';
  name: string = '';
  floor: string = '';
  zone: string = '';
  type: string = '';
  datetime: string = '';
  hasPic: boolean = false;
  description: string = '';
  misinfo = '';
  confidence = '';
  confirmed = {
    did: '',
    time: '',
    description: '',
  };
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
  confirmed?: boolean;
  misinfo?: boolean;
}

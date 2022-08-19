import { formatDate } from '@angular/common';
import { EventType } from 'src/app/enums/event-type.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record.model';
import { RealtimeRecordModel } from './realtime-record-table.model';

export class RealtimeRecordTableConverter
  implements IConverter<EventRecord[], RealtimeRecordModel[]>
{
  item = new RealtimeRecordModelConverter();
  Convert(source: EventRecord[], ...res: any[]): RealtimeRecordModel[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

export class RealtimeRecordModelConverter
  implements IConverter<EventRecord, RealtimeRecordModel>
{
  Convert(source: EventRecord, ...res: any[]): RealtimeRecordModel {
    let model = new RealtimeRecordModel();
    model.id = source.Id;
    model.floor = source.FloorName ?? '';
    model.name = source.ResourceName ?? '';
    model.event = source.EventType;
    model.time = formatDate(source.EventTime, 'HH:mm:ss', 'en');
    model.hasPic = !!source.ImageUrl;
    model.data = source;
    return model;
  }
}

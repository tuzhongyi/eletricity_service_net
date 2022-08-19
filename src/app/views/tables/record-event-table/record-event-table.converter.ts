import { formatDate } from '@angular/common';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record.model';
import { PagedList } from 'src/app/models/page.model';
import { Language } from 'src/app/tools/language';
import { RecordEventTableItemModel } from './record-event-table.model';

export class RecordEventTableConverter
  implements
    IConverter<
      PagedList<EventRecord>,
      PagedList<RecordEventTableItemModel<EventRecord>>
    >
{
  Convert(
    source: PagedList<EventRecord>
  ): PagedList<RecordEventTableItemModel<EventRecord>> {
    let paged = new PagedList<RecordEventTableItemModel<EventRecord>>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
  item = new RecordEventTableItemConverter();
}

export class RecordEventTableItemConverter
  implements IConverter<EventRecord, RecordEventTableItemModel<EventRecord>>
{
  Convert(
    source: EventRecord,
    ...res: any[]
  ): RecordEventTableItemModel<EventRecord> {
    let model = new RecordEventTableItemModel();
    model.id = source.Id;
    model.name = source.ResourceName ?? '';
    model.zone = source.ZoneName ?? '';
    model.floor = source.FloorName ?? '';
    model.type = Language.EventType(source.EventType);
    model.datetime = formatDate(source.EventTime, 'yyyy-MM-dd HH:mm:ss', 'en');

    model.data = source;
    model.hasPic = !!source.ImageUrl;

    return model;
  }
}

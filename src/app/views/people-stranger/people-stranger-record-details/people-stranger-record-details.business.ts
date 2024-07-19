import { Injectable } from '@angular/core';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { PeopleStrangerRecordListItemConverter } from '../people-stranger-record-list-item/people-stranger-record-list-item.converter';

@Injectable()
export class PeopleStrangerRecordDetailsBusiness {
  constructor(private converter: PeopleStrangerRecordListItemConverter) {}

  convert(source: StrangerRecord) {
    return this.converter.convert(source);
  }
}

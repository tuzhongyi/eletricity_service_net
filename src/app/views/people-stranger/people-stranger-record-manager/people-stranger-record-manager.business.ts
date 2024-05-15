import { Injectable } from '@angular/core';
import { Stranger } from 'src/app/models/stranger.model';
import { PeopleStrangerListItemConverter } from '../people-stranger-list-item/people-stranger-list-item.converter';

@Injectable()
export class PeopleStrangerRecordManagerBusiness {
  constructor(private converter: PeopleStrangerListItemConverter) {}

  convert(source: Stranger) {
    return this.converter.convert(source);
  }
}

import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { Stranger } from 'src/app/models/stranger.model';
import { PeopleStrangerListItemConverter } from '../people-stranger-list-item/people-stranger-list-item.converter';
import { StrangerModel } from '../people-stranger-list-item/people-stranger-list-item.model';
import { PeopleStrangerListOptions } from '../people-stranger-list/people-stranger-list.model';
import { PeopleStrangerRecordListOptions } from '../people-stranger-record-list/people-stranger-record-list.model';
import { PeopleStrangerRecordManagerBusiness } from './people-stranger-record-manager.business';
import {
  PeopleStrangerRecordManagerChannelSelection,
  PeopleStrangerRecordManagerWindow,
} from './people-stranger-record-manager.model';

@Component({
  selector: 'howell-people-stranger-record-manager',
  templateUrl: './people-stranger-record-manager.component.html',
  styleUrls: ['./people-stranger-record-manager.component.less'],
  providers: [
    PeopleStrangerListItemConverter,
    PeopleStrangerRecordManagerBusiness,
  ],
})
export class PeopleStrangerRecordManagerComponent implements OnInit {
  @Input('stranger') data?: Stranger;
  constructor(private business: PeopleStrangerRecordManagerBusiness) {
    this.stranger.opts.pageSize = 8;
  }

  window = new PeopleStrangerRecordManagerWindow();

  stranger = {
    opts: new PeopleStrangerListOptions(),
    selected: undefined as StrangerModel | undefined,
  };
  record = {
    opts: new PeopleStrangerRecordListOptions(),
    load: new EventEmitter<PeopleStrangerRecordListOptions>(),
  };

  selection = new PeopleStrangerRecordManagerChannelSelection();

  DateTimePickerView = DateTimePickerView;
  ngOnInit(): void {
    if (this.data) {
      this.stranger.selected = this.business.convert(this.data);
      this.record.opts.strangerId = this.stranger.selected.Id;
      this.record.load.emit(this.record.opts);
    }
    this.selection.select.subscribe((x) => {
      this.record.opts.cameras = x.map((y) => y.Id);
    });
  }

  onsearch() {
    this.record.load.emit(this.record.opts);
  }

  onstrangerimgerror() {
    if (this.stranger.selected) {
      this.stranger.selected.FacePictureError = true;
    }
  }

  onrecordselect(item: StrangerRecord) {
    this.window.details.data = item;
    this.window.details.show = true;
  }
}

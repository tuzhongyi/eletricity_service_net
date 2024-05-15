import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';
import { Stranger } from 'src/app/models/stranger.model';
import {
  IPeopleStrangerListOptions,
  PeopleStrangerListOptions,
} from '../people-stranger-list/people-stranger-list.model';

@Component({
  selector: 'howell-people-stranger-list-filter',
  templateUrl: './people-stranger-list-filter.component.html',
  styleUrls: ['./people-stranger-list-filter.component.less'],
})
export class PeopleStrangerListFilterComponent implements OnInit {
  @Input() selected?: Stranger;
  @Output() selectedChange = new EventEmitter<Stranger>();
  @Output() ok = new EventEmitter<Stranger>();
  @Output() cancel = new EventEmitter<void>();
  constructor() {
    this.opts.enabled = true;
  }
  DateTimePickerView = DateTimePickerView;
  opts = new PeopleStrangerListOptions();
  load = new EventEmitter<IPeopleStrangerListOptions>();
  filter = false;
  ngOnInit(): void {}

  onsearch() {
    this.load.emit(this.opts);
  }
  onselect(selecteds: Stranger[]) {
    if (selecteds && selecteds.length > 0) {
      this.selected = selecteds[0];
    } else {
      this.selected = undefined;
    }
    this.selectedChange.emit(this.selected);
  }

  onok() {
    if (this.selected) {
      this.ok.emit(this.selected);
    }
  }
  oncancel() {
    this.cancel.emit();
  }

  onorder(desc: boolean) {
    this.opts.desc = desc;
    this.load.emit(this.opts);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/models/page.model';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { PeopleStrangerRecordListBusiness } from './people-stranger-record-list.business';
import { PeopleStrangerRecordListOptions } from './people-stranger-record-list.model';

@Component({
  selector: 'howell-people-stranger-record-list',
  templateUrl: './people-stranger-record-list.component.html',
  styleUrls: ['./people-stranger-record-list.component.less'],
  providers: [PeopleStrangerRecordListBusiness],
})
export class PeopleStrangerRecordListComponent implements OnInit {
  @Input() opts = new PeopleStrangerRecordListOptions();
  @Input('load') loadEvent?: EventEmitter<PeopleStrangerRecordListOptions>;
  @Output() select = new EventEmitter<StrangerRecord>();
  @Input() column = 4;
  @Input() row = 3;

  constructor(private business: PeopleStrangerRecordListBusiness) {}

  datas: StrangerRecord[] = [];
  page?: Page;

  ngOnInit(): void {
    if (this.loadEvent) {
      this.loadEvent.subscribe((opts) => {
        this.opts = opts;
        this.load(1);
      });
    }

    this.load(1);
  }

  load(index: number, size: number = this.row * this.column) {
    this.business.load(index, size, this.opts).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
    });
  }

  pageEvent(page: PageEvent) {
    this.load(page.pageIndex + 1, page.pageSize);
  }

  onclick(item: StrangerRecord) {
    this.select.emit(item);
  }
}

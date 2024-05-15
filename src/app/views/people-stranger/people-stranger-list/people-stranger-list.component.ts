import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Page, PagedList } from 'src/app/models/page.model';
import { Stranger } from 'src/app/models/stranger.model';
import { CompareTool } from 'src/app/tools/compare-tool/compare.tool';
import { PeopleStrangerListItemOperable } from '../people-stranger-list-item/people-stranger-list-item.model';
import { PeopleStrangerListBusiness } from './people-stranger-list.business';
import {
  IPeopleStrangerListOptions,
  PeopleStrangerListOptions,
} from './people-stranger-list.model';

@Component({
  selector: 'howell-people-stranger-list',
  templateUrl: './people-stranger-list.component.html',
  styleUrls: ['./people-stranger-list.component.less'],
  providers: [PeopleStrangerListBusiness],
})
export class PeopleStrangerListComponent implements OnInit {
  @Input() business: IBusiness<PagedList<Stranger>>;
  @Input() opts: IPeopleStrangerListOptions = new PeopleStrangerListOptions();
  @Input('load') loadEvent?: EventEmitter<IPeopleStrangerListOptions>;
  @Input() column: number = 7;
  @Input() row = 4;
  @Input() selecteds: Stranger[] = [];
  @Output() selectedsChange = new EventEmitter<Stranger[]>();

  @Output() sure = new EventEmitter<Stranger>();
  @Input() single = false;
  @Input() operable: PeopleStrangerListItemOperable = {};
  @Output() itemclick = new EventEmitter<Stranger>();
  @Output() enableChange = new EventEmitter<Stranger>();
  @Input() hasfoot = false;
  @Input() haspage = true;
  @Output() close = new EventEmitter<Stranger>();
  @Output() record = new EventEmitter<Stranger>();

  constructor(business: PeopleStrangerListBusiness) {
    this.business = business;
  }

  page?: Page;
  datas: Stranger[] = [];

  ngOnInit(): void {
    if (this.loadEvent) {
      this.loadEvent.subscribe((opts) => {
        this.opts = opts;
        this.load();
      });
    }
    this.opts.pageSize = this.row * this.column;
    this.load();
  }

  load() {
    this.business.load(this.opts).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
    });
  }

  has(item: Stranger) {
    return this.selecteds.findIndex((x) => CompareTool.Id(x, item)) >= 0;
  }

  pageEvent(page: PageEvent) {
    let index = page.pageIndex + 1;
    this.opts.pageIndex = index;
    this.load();
  }

  onselect(item: Stranger) {
    if (this.single) {
      this.selecteds = [item];
    } else {
      let index = this.selecteds.findIndex((x) => x.Id == item.Id);
      if (index < 0) {
        this.selecteds.push(item);
      } else {
        this.selecteds.splice(index, 1);
      }
    }
    this.selectedsChange.emit(this.selecteds);

    this.itemclick.emit(item);
  }

  ondblclick(item: Stranger) {
    this.selecteds = [item];
    this.sure.emit(item);
  }

  onselectall(all?: boolean) {
    switch (all) {
      case true:
        this.selecteds = [...this.selecteds, ...this.datas];
        break;
      case false:
        this.selecteds = this.datas.filter((x) => !this.selecteds.includes(x));
        break;
      default:
        this.selecteds = this.datas.filter((x) => !this.datas.includes(x));
        break;
    }
    this.selectedsChange.emit(this.selecteds);
  }

  onclear() {
    this.selecteds = [];
    this.selectedsChange.emit(this.selecteds);
  }

  onenabled(item: Stranger) {
    // this.business
    //   .update(item)
    //   .then((x) => {
    //     let index = this.datas.findIndex((x) => x.Id == item.Id);
    //     this.datas[index] = x;
    //     this.toastr.success('操作成功');
    //   })
    //   .catch((x) => {
    //     this.toastr.error('操作失败');
    //   });

    this.enableChange.emit(item);
  }

  onclose(data: Stranger) {
    this.close.emit(data);
  }
  onrecord(data: Stranger) {
    this.record.emit(data);
  }
}

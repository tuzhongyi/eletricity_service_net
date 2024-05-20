import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Stranger } from 'src/app/models/stranger.model';
import {
  IPeopleStrangerListOptions,
  PeopleStrangerListOptions,
} from '../people-stranger-list/people-stranger-list.model';
import { PeopleStrangerManagerBusiness } from './people-stranger-manager.business';
import { PeopleStrangerManagerWindow } from './people-stranger-manager.model';

@Component({
  selector: 'howell-people-stranger-manager',
  templateUrl: './people-stranger-manager.component.html',
  styleUrls: ['./people-stranger-manager.component.less'],
  providers: [PeopleStrangerManagerBusiness],
})
export class PeopleStrangerManagerComponent implements OnInit {
  constructor(
    private business: PeopleStrangerManagerBusiness,
    private toastr: ToastrService
  ) {
    this.opts.pageSize = this.data.row * this.data.column;
  }

  opts = new PeopleStrangerListOptions();
  load = new EventEmitter<IPeopleStrangerListOptions>();
  reload = new EventEmitter<Stranger[]>();
  window = new PeopleStrangerManagerWindow();

  data = {
    row: 5,
    column: 6,
  };

  selecteds: Stranger[] = [];
  operable = {
    record: true,
  };
  handle: any;

  ngOnInit(): void {}

  onfullscreen(is: boolean) {
    this.data.column = is ? 7 : 6;
    this.opts.pageSize = this.data.row * this.data.column;
    this.load.emit(this.opts);
    console.log(this.opts);
  }

  onsearch() {
    this.load.emit(this.opts);
  }

  onmerge() {
    if (this.selecteds.length < 2) {
      this.toastr.warning('请选择至少两个人员进行合并');
      return;
    }

    this.window.merge.show = true;
  }
  onmergeok() {
    this.load.emit(this.opts);
    this.window.merge.show = false;
  }

  onselectclear() {
    this.selecteds = [];
  }
  onstrangerenable(enabled: boolean) {
    if (this.operable) {
      this.business
        .update(this.selecteds, enabled)
        .then((x) => {
          this.toastr.success('操作成功');
          this.reload.emit(x);
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        });
    }
  }
  onstrangerrecord(item: Stranger) {
    this.window.record.data = item;
    this.window.record.show = true;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Stranger } from 'src/app/models/stranger.model';
import { CompareTool } from 'src/app/tools/compare-tool/compare.tool';
import { PeopleStrangerListItemConverter } from '../people-stranger-list-item/people-stranger-list-item.converter';
import { StrangerModel } from '../people-stranger-list-item/people-stranger-list-item.model';
import { IPeopleStrangerListOptions } from '../people-stranger-list/people-stranger-list.model';
import { PeopleStrangerMergeListBusiness } from './people-stranger-merge-list.business';
import { PeopleStrangerMergeListOptions } from './people-stranger-merge-manager.model';

@Component({
  selector: 'howell-people-stranger-merge-manager',
  templateUrl: './people-stranger-merge-manager.component.html',
  styleUrls: ['./people-stranger-merge-manager.component.less'],
  providers: [PeopleStrangerMergeListBusiness, PeopleStrangerListItemConverter],
})
export class PeopleStrangerMergeManagerComponent implements OnInit {
  @Input() datas: Stranger[] = [];
  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public business: PeopleStrangerMergeListBusiness,
    private toastr: ToastrService
  ) {}

  opts = new PeopleStrangerMergeListOptions();
  load = new EventEmitter<IPeopleStrangerListOptions>();

  selected?: StrangerModel;

  ngOnInit(): void {
    this.opts.datas = this.datas;
    this.onselect(this.datas);
  }

  onsearch() {
    this.load.emit(this.opts);
  }

  onselect(datas: Stranger[]) {
    if (datas && datas.length > 0) {
      this.selected = this.business.convert(datas[0]);
    } else {
      this.selected = undefined;
    }
  }
  onselectedremove(item: Stranger) {
    this.datas = this.datas.filter((x) => x.Id != item.Id);
  }

  onclose(item: Stranger) {
    this.opts.datas = this.opts.datas.filter((x) => !CompareTool.Id(x, item));
    this.onselect(this.opts.datas);
    this.load.emit(this.opts);
  }

  onok() {
    if (this.selected) {
      this.business
        .merge(this.selected, this.datas)
        .then((x) => {
          this.toastr.success('合并成功');
          this.ok.emit();
        })
        .catch((x) => {
          this.toastr.error('合并失败');
        });
    }
  }
  oncancel() {
    this.cancel.emit();
  }
}

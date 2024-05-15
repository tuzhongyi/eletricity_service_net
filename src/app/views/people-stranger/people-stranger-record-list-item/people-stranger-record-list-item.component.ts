import { Component, Input, OnInit } from '@angular/core';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';
import { PeopleStrangerRecordListItemBusiness } from './people-stranger-record-list-item.business';
import { PeopleStrangerRecordListItemConverter } from './people-stranger-record-list-item.converter';
import { StrangerRecordModel } from './people-stranger-record-list-item.model';

export let PeopleStrangerRecordListItemProviders = [
  PeopleStrangerRecordListItemBusiness,
  PeopleStrangerRecordListItemConverter,
];

@Component({
  selector: 'howell-people-stranger-record-list-item',
  templateUrl: './people-stranger-record-list-item.component.html',
  styleUrls: ['./people-stranger-record-list-item.component.less'],
  providers: [...PeopleStrangerRecordListItemProviders],
})
export class PeopleStrangerRecordListItemComponent implements OnInit {
  @Input() data?: StrangerRecord;

  constructor(private business: PeopleStrangerRecordListItemBusiness) {}

  model?: StrangerRecordModel;

  ngOnInit(): void {
    if (this.data) {
      this.load(this.data);
    }
  }

  load(data: StrangerRecord) {
    this.model = this.business.convert(data);
  }

  onimageerror(e: Event) {
    let img = e.target as HTMLImageElement;
    img.src = UrlTool.image.error;

    // if (this.model) {
    //   let url = this.business.image(this.model);
    //   if (url) {
    //     img.src = url;
    //   }
    // }
  }
}

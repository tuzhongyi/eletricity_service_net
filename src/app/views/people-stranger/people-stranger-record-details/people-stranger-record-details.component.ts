import { Component, Input, OnInit } from '@angular/core';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';
import { PeopleStrangerRecordListItemBusiness } from '../people-stranger-record-list-item/people-stranger-record-list-item.business';
import { PeopleStrangerRecordListItemProviders } from '../people-stranger-record-list-item/people-stranger-record-list-item.component';
import { StrangerRecordModel } from '../people-stranger-record-list-item/people-stranger-record-list-item.model';

@Component({
  selector: 'howell-people-stranger-record-details',
  templateUrl: './people-stranger-record-details.component.html',
  styleUrls: ['./people-stranger-record-details.component.less'],
  providers: [...PeopleStrangerRecordListItemProviders],
})
export class PeopleStrangerRecordDetailsComponent implements OnInit {
  @Input() data?: StrangerRecord;

  constructor(private business: PeopleStrangerRecordListItemBusiness) {}

  model?: StrangerRecordModel;

  image = {
    error: {
      camera: false,
      face: false,
    },
  };

  ngOnInit(): void {
    if (this.data) {
      this.model = this.business.convert(this.data);
    }
  }

  onimageclick(url: string) {
    window.open(url, '_blank');
  }
  onimageerror(e: Event) {
    let img = e.target as HTMLImageElement;
    img.src = UrlTool.image.error;
    img.style.objectFit = 'contain';
  }
  onfaceerror(e: Event) {}
}

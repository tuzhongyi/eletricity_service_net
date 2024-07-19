import { Component, Input, OnInit } from '@angular/core';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';
import { PeopleStrangerRecordListItemConverter } from '../people-stranger-record-list-item/people-stranger-record-list-item.converter';
import { StrangerRecordModel } from '../people-stranger-record-list-item/people-stranger-record-list-item.model';
import { PeopleStrangerRecordDetailsVideoController } from './people-stranger-record-details-video.controller';
import { PeopleStrangerRecordDetailsBusiness } from './people-stranger-record-details.business';

@Component({
  selector: 'howell-people-stranger-record-details',
  templateUrl: './people-stranger-record-details.component.html',
  styleUrls: ['./people-stranger-record-details.component.less'],
  providers: [
    PeopleStrangerRecordDetailsBusiness,
    PeopleStrangerRecordListItemConverter,
  ],
})
export class PeopleStrangerRecordDetailsComponent implements OnInit {
  @Input() data?: StrangerRecord;

  constructor(private business: PeopleStrangerRecordDetailsBusiness) {}

  model?: StrangerRecordModel;

  video = new PeopleStrangerRecordDetailsVideoController();

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

  onimageclick() {
    this.video.show = !!(this.data && this.data.CameraId);
  }

  onplayback() {
    if (this.data && this.data.CameraId) {
      this.video.playback(this.data.CameraId, this.data.Time);
    }
  }

  onimageerror(e: Event) {
    let img = e.target as HTMLImageElement;
    img.src = UrlTool.image.error;
    img.style.objectFit = 'contain';
  }
  onfaceerror(e: Event) {}
}

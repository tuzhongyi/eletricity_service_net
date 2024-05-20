import { Injectable } from '@angular/core';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { PeopleStrangerRecordListItemConverter } from '../people-stranger-record-list-item/people-stranger-record-list-item.converter';

@Injectable()
export class PeopleStrangerRecordDetailsBusiness {
  constructor(
    private service: SRServerRequestService,
    private converter: PeopleStrangerRecordListItemConverter,
    private config: ConfigRequestService
  ) {}

  async playback(cameraId: string, time: Date) {
    let config = await this.config.get();

    let begin = new Date(time.getTime());
    begin.setSeconds(begin.getSeconds() + config.playback.begin);
    let end = new Date(time.getTime());
    end.setSeconds(end.getSeconds() + config.playback.end);
    return this.service.playback(cameraId, {
      BeginTime: begin,
      EndTime: end,
    });
  }
  convert(source: StrangerRecord) {
    return this.converter.convert(source);
  }
}

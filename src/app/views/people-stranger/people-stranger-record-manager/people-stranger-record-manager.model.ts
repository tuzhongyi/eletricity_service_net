import { LabelSelection } from 'src/app/components/common-label-select/common-label-select.selection';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { IdNameModel } from 'src/app/models/model.interface';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { VideoSourceTableItemModel } from '../../tables/video-source-table/video-source-table.model';

export class PeopleStrangerRecordManagerWindow {
  details = new DetailsWindow();
}

class DetailsWindow extends WindowViewModel {
  style = {
    width: '1100px',
    height: '560px',
  };
  title = '事件记录信息';
  data?: StrangerRecord;
}

export class PeopleStrangerRecordManagerChannelSelection extends LabelSelection<VideoSourceTableItemModel> {
  protected convert(source: VideoSourceTableItemModel<any>): IdNameModel {
    let item: IdNameModel = {
      Id: source.id,
      Name: source.name,
    };
    return item;
  }
}

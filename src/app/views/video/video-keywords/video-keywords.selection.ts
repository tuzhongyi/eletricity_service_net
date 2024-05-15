import { LabelSelection } from 'src/app/components/common-label-select/common-label-select.selection';
import { IdNameModel } from 'src/app/models/model.interface';
import { VideoSourceTableItemModel } from '../../tables/video-source-table/video-source-table.model';

export class VideoKeywordsChannelSelection extends LabelSelection<VideoSourceTableItemModel> {
  protected convert(source: VideoSourceTableItemModel<any>): IdNameModel {
    let item: IdNameModel = {
      Id: source.id,
      Name: source.name,
    };
    return item;
  }
}

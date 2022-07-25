import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { VideoSourceTableItemModel } from './video-source-table.model';

export class VideoSourceTableConverter
  implements IConverter<Camera[], VideoSourceTableItemModel<Camera>[]>
{
  private item = new VideoSourceTableItemConverter();
  Convert(
    source: Camera[],
    ...res: any[]
  ): VideoSourceTableItemModel<Camera>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

class VideoSourceTableItemConverter
  implements IConverter<Camera, VideoSourceTableItemModel<Camera>>
{
  Convert(source: Camera, ...res: any[]): VideoSourceTableItemModel<Camera> {
    let model = new VideoSourceTableItemModel();
    model.data = source;
    model.id = source.Id;
    model.name = source.Name ?? '';
    return model;
  }
}

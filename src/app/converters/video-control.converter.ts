import { IConverter } from '../interfaces/converter.interface';
import { VideoUrl } from '../models/video-url.model';
import { VideoModel } from '../models/video.model';

export class VideoControlConverter implements IConverter<VideoUrl, VideoModel> {
  Convert(source: VideoUrl, ...res: any[]): VideoModel {
    let model = new VideoModel(source.Url);
    if (!model.username) {
      model.username = source.Username;
    }
    if (!model.password) {
      model.password = source.Password;
    }
    return model;
  }
}

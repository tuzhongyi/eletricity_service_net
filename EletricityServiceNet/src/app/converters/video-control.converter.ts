import { IConverter } from '../interfaces/converter.interface';
import { VideoUrl } from '../models/video-url.model';
import { VideoModel } from '../models/video.model';

export class VideoControlConverter implements IConverter<VideoUrl, VideoModel> {
  Convert(source: VideoUrl, ...res: any[]): VideoModel {
    let model = new VideoModel(source.Url);
    model.username = source.Username;
    model.password = source.Password;
    return model;
  }
}

import { subtitling_url } from '../basic.url';
import { SubtitlingServerUrl } from './subtitling-server.url';

export class SubtitlingUrl {
  static get server() {
    return new SubtitlingServerUrl(subtitling_url);
  }

  static srt() {
    return `${subtitling_url}/Subtitling/Srt`;
  }

  static keywords() {
    return `${subtitling_url}/Subtitling/Keywords`;
  }
}

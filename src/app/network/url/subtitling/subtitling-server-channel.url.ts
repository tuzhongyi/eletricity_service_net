import { AInnerUrl } from '../businesshall_service.url';

export class SubtitlingServerChannelUrl extends AInnerUrl {
  constructor(base: string) {
    super(`${base}/Channels`);
  }

  schedule(id: string) {
    return `${this.item(id)}/Schedule`;
  }

  supported() {
    return `${this.basic()}/Supported`;
  }
}

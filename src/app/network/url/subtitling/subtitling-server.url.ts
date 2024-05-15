import { AInnerUrl } from '../businesshall_service.url';
import { SubtitlingServerChannelUrl } from './subtitling-server-channel.url';

export class SubtitlingServerUrl extends AInnerUrl {
  constructor(base: string) {
    super(`${base}/Servers`);
  }

  channel(id?: string) {
    let url = id ? this.item(id) : this.basic();
    return new SubtitlingServerChannelUrl(url);
  }

  sync = {
    from: {
      business: (id: string) => {
        return `${this.item(id)}/SyncFromBusiness`;
      },
    },
    to: {
      server: (id: string) => {
        return `${this.item(id)}/SyncToServer`;
      },
    },
  };
}

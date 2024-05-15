import { Injectable } from '@angular/core';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';

@Injectable()
export class SettingsSubtitleChannelManagerBusiness {
  constructor(private service: SubtitlingRequestService) {}
  server() {
    return this.service.server.array();
  }

  sync = {
    from: {
      business: (serverId: string) => {
        return this.service.server.sync.from.business(serverId);
      },
    },
    to: {
      server: (serverId: string) => {
        return this.service.server.sync.to.server(serverId);
      },
    },
  };

  remove(serverId: string, channelId: string) {
    return this.service.server.channel.delete(serverId, channelId);
  }

  update(data: SubtitlingChannel) {
    return this.service.server.channel.update(data);
  }
}

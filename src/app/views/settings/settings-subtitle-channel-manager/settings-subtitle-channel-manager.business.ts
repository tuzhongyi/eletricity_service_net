import { Injectable } from '@angular/core';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class SettingsSubtitleChannelManagerBusiness {
  constructor(
    subtitling: SubtitlingRequestService,
    businesshall: BusinessHallRequestService,
    private store: StoreService
  ) {
    this.service = { subtitling, businesshall };
  }

  private service: {
    subtitling: SubtitlingRequestService;
    businesshall: BusinessHallRequestService;
  };

  server() {
    return this.service.subtitling.server.array();
  }

  sync = {
    from: {
      business: (serverId: string) => {
        return this.service.subtitling.server.sync.from.business(serverId);
      },
    },
    to: {
      server: (serverId: string) => {
        return this.service.subtitling.server.sync.to.server(serverId);
      },
    },
  };

  camera = {
    picture: async (data: SubtitlingChannel) => {
      let hall = await this.store.getBusinessHall();
      let picture = await this.service.businesshall.camera.picture.captureBlob(
        hall.Id,
        data.Id
      );
      console.log(picture);
      return picture;
    },
  };

  remove(serverId: string, channelId: string) {
    return this.service.subtitling.server.channel.delete(serverId, channelId);
  }

  update(data: SubtitlingChannel) {
    return this.service.subtitling.server.channel.update(data);
  }
}

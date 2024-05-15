import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';

export class SettingsSubtitleChannelTableOptions {
  name?: string;
  enabled?: boolean;
  serverId?: string;

  pageIndex: number = 1;
  pageSize: number = 10;
}

export class SubtitlingChannelModel extends SubtitlingChannel {
  Server!: Promise<SubtitlingServer>;
}

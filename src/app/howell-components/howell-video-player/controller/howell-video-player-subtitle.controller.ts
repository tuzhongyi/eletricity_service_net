import { EventEmitter, Injectable } from '@angular/core';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { VideoModel } from 'src/app/models/video.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { HowellVideoPlayerBusiness } from '../business/howell-video-player.business';
import {
  HowellPlaybackArgs,
  HowellSubtitlingArgs,
} from '../howell-video-player.model';

@Injectable()
export class HowellVideoPlayerSubtitleController {
  opened = false;
  play = new EventEmitter<VideoModel>();
  seek = new EventEmitter<number>();
  stop = new EventEmitter<void>();
  pause = new EventEmitter<void>();
  osd = new EventEmitter<void>();
  setting = new EventEmitter<string>();

  private _playing: boolean = false;
  public get playing(): boolean {
    return this._playing;
  }
  public set playing(v: boolean) {
    if (v === this._playing) return;
    this._playing = v;
    if (this._playing) {
      this.setposition();
    }
  }

  constructor(
    private business: HowellVideoPlayerBusiness,
    private config: ConfigRequestService
  ) {}

  private datas: SubtitlingItem[] = [];
  private selected?: SubtitlingItem;
  reserve = 5 * 1000;
  stoping = false;
  private _offset?: number;
  get offset() {
    return new Promise<number>((resolve) => {
      if (this._offset != undefined) {
        resolve(this._offset);
        return;
      }
      this.config.get().then((x) => {
        this._offset = x.playback.subtitle.offset;
        resolve(this._offset);
      });
    });
  }

  private _stop() {
    this.stop.emit();
    this.stoping = true;
    this.selected = undefined;
  }

  private equals(a: SubtitlingItem[], b: SubtitlingItem[]) {
    if (a.length !== b.length) return false;
    if (a.length === 0) return false;

    let first_id = {
      a: a[0].ChannelId,
      b: b[0].ChannelId,
    };

    let first_time = {
      a: a[0].BeginTime.getTime(),
      b: b[0].BeginTime.getTime(),
    };

    let last_time = {
      a: a[a.length - 1].EndTime.getTime(),
      b: b[b.length - 1].EndTime.getTime(),
    };

    return (
      first_id.a === first_id.b &&
      first_time.a === first_time.b &&
      last_time.a === last_time.b
    );
  }

  subtitling(args: HowellSubtitlingArgs) {
    if (args.datas.length === 0) return;
    if (!this.equals(this.datas, args.datas)) {
      // this._stop();
      this.playing = false;
    }

    if (this.playing) {
      this.select(args);
    } else {
      this.begin(args);
    }
  }

  begin(args: HowellSubtitlingArgs) {
    if (args.datas.length === 0) return;
    this.datas = args.datas;
    this.selected = args.selected;
    this.opened = true;
    let _args = new HowellPlaybackArgs();
    let begin = args.datas[0].BeginTime;
    let end = args.datas[args.datas.length - 1].EndTime;
    _args.cameraId = args.datas[0].ChannelId;
    _args.duration = { begin, end };
    this.business.playback(_args, this.reserve).then((data) => {
      this.play.emit(data);
    });
  }

  select(args: HowellSubtitlingArgs) {
    this.pause.emit();
    this.selected = args.selected;
    this.setposition();
  }

  setposition() {
    if (!this.selected || this.datas.length == 0) return;
    let begin = new Date(this.datas[0].BeginTime.getTime());
    begin.setTime(begin.getTime() - this.reserve);
    let postition =
      this.selected.BeginTime.getTime() - begin.getTime() - this.reserve;

    this.toseek(postition);
  }

  toseek(postition: number) {
    if (postition === 0) postition = 1;
    this.seek.emit(postition);
  }

  onplaying(index: number) {
    this.playing = true;
  }
  onstoping(index: number) {
    this.stoping = false;
    this.playing = false;
  }

  onposition(value: number) {
    this.osd.emit();
  }
  onosd(value: number) {}

  async ontimer(args: TimeArgs) {
    let offset = await this.offset;
    let time = new Date(args.current);
    let item = this.datas.find((x) => {
      let begin = x.BeginTime.getTime();
      let end = x.EndTime.getTime();
      return begin + offset * 1000 <= args.current && args.current < end;
    });
    if (item) {
      this.setting.emit(item.Subtitles);
    } else {
      this.setting.emit('');
    }
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { VideoModel } from 'src/app/models/video.model';
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

  private _playing: boolean = false;
  public get playing(): boolean {
    return this._playing;
  }
  public set playing(v: boolean) {
    if (v === this._playing) return;
    this._playing = v;
    if (this._playing) {
      this.onposition();
    }
  }

  constructor(private business: HowellVideoPlayerBusiness) {}

  private datas: SubtitlingItem[] = [];
  private selected?: SubtitlingItem;
  reserve = 5 * 1000;
  stoping = false;

  private _stop() {
    this.stop.emit();
    this.stoping = true;
    this.selected = undefined;
  }

  private equals(a?: SubtitlingItem, b?: SubtitlingItem) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.ChannelId === b.ChannelId;
  }

  subtitling(args: HowellSubtitlingArgs) {
    if (args.datas.length === 0) return;
    if (
      this.selected &&
      args.selected &&
      !this.equals(this.selected, args.selected)
    ) {
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
    this.selected = args.selected;
    this.onposition();
  }

  onposition() {
    if (!this.selected || this.datas.length == 0) return;
    let begin = new Date(this.datas[0].BeginTime.getTime());
    begin.setTime(begin.getTime() - this.reserve);
    let postition =
      this.selected.BeginTime.getTime() - begin.getTime() - this.reserve;
    if (postition === 0) postition = 1;
    console.log(postition);
    this.seek.emit(postition);
  }

  onplaying(index: number) {
    this.playing = true;
  }
  onstoping(index: number) {
    this.stoping = false;
    this.playing = false;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';
import {
  HowellVideoPlayerBusiness,
  HowellVideoPlayerProviders,
} from './business/howell-video-player.business';
import { HowellVideoPlayerSubtitleController } from './controller/howell-video-player-subtitle.controller';
import {
  HowellPlaybackArgs,
  HowellPreviewArgs,
  HowellSubtitlingArgs,
} from './howell-video-player.model';

@Component({
  selector: 'howell-video-player',
  templateUrl: './howell-video-player.component.html',
  styleUrls: ['./howell-video-player.component.less'],
  providers: [
    ...HowellVideoPlayerProviders,
    HowellVideoPlayerSubtitleController,
  ],
})
export class HowellVideoPlayerComponent implements OnInit {
  @Input('preview') input_preview?: EventEmitter<HowellPreviewArgs>;
  @Input('playback') input_playback?: EventEmitter<HowellPlaybackArgs>;
  @Input() name: string = '';
  @Input() stop = new EventEmitter<void>();
  @Input() seek: EventEmitter<number> = new EventEmitter();
  @Input('reserve')
  public set input_reserve(v: number | undefined) {
    if (v === undefined) return;
    this.reserve = v;
  }

  @Input() index: number = 0;
  @Input('subtitling') input_subtitling =
    new EventEmitter<HowellSubtitlingArgs>();

  @Output() destroy: EventEmitter<VideoModel> = new EventEmitter();
  @Output() onStoping: EventEmitter<number> = new EventEmitter();
  @Output() onViewerClicked: EventEmitter<number> = new EventEmitter();
  @Output() onPlaying: EventEmitter<number> = new EventEmitter();
  @Output() viewed: EventEmitter<void> = new EventEmitter();

  constructor(
    private business: HowellVideoPlayerBusiness,
    public subtitle: HowellVideoPlayerSubtitleController
  ) {}

  play = new EventEmitter<VideoModel>();

  private _playing: boolean = false;
  public get playing(): boolean {
    return this._playing;
  }
  public set playing(v: boolean) {
    if (this._playing === v) return;
    this._playing = v;
    if (this._playing) {
      this.onbegin();
    }
  }
  private reserve = 15 * 1000;

  ngOnInit(): void {
    if (this.input_preview) {
      this.input_preview.subscribe((args) => {
        this.preview(args);
      });
    }
    if (this.input_playback) {
      this.input_playback.subscribe((args) => {
        this.playback(args);
      });
    }
    if (this.input_subtitling) {
      this.input_subtitling.subscribe((args) => {
        this.subtitle.subtitling(args);
      });
    }
    Promise.resolve().then(() => {
      this.viewed.emit();
    });
    this.regist();
  }

  regist() {
    this.subtitle.seek.subscribe((x) => {
      this.seek.emit(x);
    });
    this.subtitle.play.subscribe((x) => {
      this.play.emit(x);
    });
    this.subtitle.stop.subscribe(() => {
      this.stop.emit();
    });
  }

  preview(args: HowellPreviewArgs) {
    this.business.preview(args).then((data) => {
      this.play.emit(data);
    });
  }
  playback(args: HowellPlaybackArgs) {
    if (this.playing) {
      this.playing = false;
    }
    this.business.playback(args, this.reserve).then((data) => {
      this.play.emit(data);
    });
  }

  ondestroy(data: VideoModel) {
    this.destroy.emit(data);
  }
  onstoping(index: number) {
    if (this.subtitle.opened) {
      this.subtitle.onstoping(index);
      return;
    }
    this.playing = false;
    this.onStoping.emit(index);
  }
  onviewerclicked(index: number) {
    this.onViewerClicked.emit(index);
  }
  onplaying(index: number) {
    if (this.subtitle.opened) {
      this.subtitle.onplaying(index);
      return;
    }
    this.playing = true;
    this.onPlaying.emit(index);
  }

  onbegin() {
    this.seek.emit(this.reserve - 5 * 1000);
  }
}

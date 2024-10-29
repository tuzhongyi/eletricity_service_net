import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ScreenMode } from 'src/app/enums/screen-mode.enum';
import {
  HowellPlaybackArgs,
  HowellPreviewArgs,
  HowellSubtitlingArgs,
  HowellVideoPlayerArgs,
} from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { VideoPlayerListItem } from './video-player-list.model';

@Component({
  selector: 'howell-video-player-list',
  templateUrl: './video-player-list.component.html',
  styleUrls: ['./video-player-list.component.less'],
})
export class VideoPlayerListComponent implements OnInit, OnChanges {
  @Input() mode = ScreenMode.one;
  @Input() play?: EventEmitter<HowellVideoPlayerArgs>;
  @Input() seek?: EventEmitter<number>;
  @Input() index: number = 0;
  @Input() subtitling?: EventEmitter<HowellSubtitlingArgs>;
  @Output() indexChange = new EventEmitter<number>();

  @Output() playing = new EventEmitter<number>();
  @Output() stoping = new EventEmitter<number>();

  constructor() {}
  datas: VideoPlayerListItem[] = [];

  ScreenMode = ScreenMode;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.initScreens();
      // if (this.mode > ScreenMode.one && this.index != 0) {
      //   this.datas[0].stop();
      // }
    }
  }

  ngOnInit(): void {
    this.initScreens();
    this.registEvent();
  }

  initModeOne() {
    let current = this.datas[this.index];
    if (!current) {
      current = new VideoPlayerListItem(0);
    }
    this.index = 0;
    this.datas = [current];
  }
  initModelMore() {
    let temps = this.datas;
    this.datas = [];
    for (let i = 0; i < this.mode; i++) {
      let old = temps.find((x) => x.index == i);
      if (old && old.playing) {
        this.datas.push(old);
      } else {
        this.datas.push(new VideoPlayerListItem(i));
      }
    }
    if (this.index >= this.mode) {
      this.index = this.mode - 1;
    } else {
      let current = this.datas.find((x) => x.selected);
      if (current) {
        this.index = current.index;
      }
    }
  }

  initScreens() {
    if (this.mode == ScreenMode.one) {
      this.initModeOne();
    } else {
      this.initModelMore();
    }
    for (let i = 0; i < this.datas.length; i++) {
      this.datas[i].selected = this.index === i;
    }
  }

  registEvent() {
    if (this.seek) {
      this.seek.subscribe((x) => {
        if (this.datas.length > this.index) {
          this.datas[this.index].seek.emit(x);
        }
      });
    }
    if (this.play) {
      this.play.subscribe((args) => {
        if (this.datas.length > this.index) {
          if (args instanceof HowellPreviewArgs) {
            this.datas[this.index].preview(args);
          } else if (args instanceof HowellPlaybackArgs) {
            this.datas[this.index].playback(args);
          } else {
            throw new Error('Invalid args type');
          }
        }
      });
    }
    if (this.subtitling) {
      this.subtitling.subscribe((args) => {
        if (this.datas.length > this.index) {
          this.datas[this.index].subtitling(args);
        }
      });
    }
  }

  onscreenclicked(index: number) {
    this.index = this.datas.findIndex((x) => x.index == index);
    this.indexChange.emit(this.index);
  }
  onstop(index: number) {
    this.datas[index].stop();
    this.stoping.emit(index);
  }

  onplaying(index: number) {
    this.playing.emit(index);
  }
}

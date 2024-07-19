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
      if (this.mode > ScreenMode.one && this.index != 0) {
        this.datas[0].stop();
      }
    }
  }

  ngOnInit(): void {
    this.initScreens();
    this.registEvent();
  }

  initScreens() {
    let current = this.datas[this.index];

    this.datas = [];
    for (let i = 0; i < this.mode; i++) {
      this.datas.push(new VideoPlayerListItem());
    }
    if (this.index >= this.mode) {
      this.index = 0;
    }
    if (current) {
      this.datas[this.index] = current;
    }
    this.datas[this.index].selected = true;
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
    this.index = index;
    this.indexChange.emit(index);
  }
  onstop(index: number) {
    this.datas[index].stop();
    this.stoping.emit(index);
  }

  onplaying(index: number) {
    this.playing.emit(index);
  }
}

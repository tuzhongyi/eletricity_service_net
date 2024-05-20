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
import { VideoModel } from 'src/app/models/video.model';
import { VideoPlayerListItem } from './video-player-list.model';

@Component({
  selector: 'howell-video-player-list',
  templateUrl: './video-player-list.component.html',
  styleUrls: ['./video-player-list.component.less'],
})
export class VideoPlayerListComponent implements OnInit, OnChanges {
  @Input() mode = ScreenMode.one;
  @Input() play?: EventEmitter<VideoModel>;
  @Input() subtitle?: EventEmitter<boolean>;
  @Input() seek?: EventEmitter<number>;
  @Input() index: number = 0;
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
        this.datas[0].data = undefined;
      }
    }
  }

  ngOnInit(): void {
    this.initScreens();
    this.registEvent();
  }

  initScreens() {
    this.datas = [];
    for (let i = 0; i < this.mode; i++) {
      const element = this.datas[i];
      this.datas.push(new VideoPlayerListItem());
    }
    let index = this.index;
    if (index >= this.mode) {
      index = 0;
      this.datas[index] = this.datas[this.index];
    }
    this.datas[index].selected = true;
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
      this.play.subscribe((x) => {
        if (this.datas.length > this.index) {
          this.datas[this.index].data = x;
        }
      });
    }
    if (this.subtitle) {
      this.subtitle.subscribe((x) => {
        if (this.datas.length > this.index) {
          this.datas[this.index].subtitle = x;
          this.datas[this.index].reserve = 0;
        }
      });
    }
  }

  onscreenclicked(index: number) {
    this.index = index;
    this.indexChange.emit(index);
  }
  onstop(index: number) {
    this.datas[index].data = undefined;
    this.stoping.emit(index);
  }

  onplaying(index: number) {
    this.playing.emit(index);
  }
}

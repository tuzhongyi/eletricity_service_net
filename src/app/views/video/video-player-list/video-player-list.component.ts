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

@Component({
  selector: 'howell-video-player-list',
  templateUrl: './video-player-list.component.html',
  styleUrls: ['./video-player-list.component.less'],
})
export class VideoPlayerListComponent implements OnInit, OnChanges {
  @Input()
  mode = ScreenMode.one;
  @Input()
  play?: EventEmitter<VideoModel>;
  @Input()
  index: number = 0;
  @Output()
  indexChange = new EventEmitter<number>();

  constructor() {}
  datas: (VideoModel | undefined)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.initScreens();
      if (this.mode > ScreenMode.one && this.index != 0) {
        this.datas[0] = undefined;
      }
    }
    if (changes['play']) {
      if (this.play) {
        this.play.subscribe((x) => {
          this.datas[this.index] = x;
        });
      }
    }
  }

  initScreens() {
    this.screens = new Array(this.mode);
    let index = this.index;
    if (index >= this.mode) {
      index = 0;
      this.datas[index] = this.datas[this.index];
    }

    this.screens[index] = true;
  }

  screens: boolean[] = [true];

  ScreenMode = ScreenMode;
  ngOnInit(): void {
    this.initScreens();
    this.datas = new Array(this.mode);
  }

  onscreenclicked(index: number) {
    this.index = index;
    this.indexChange.emit(index);
  }
  onstop(index: number) {
    this.datas[index] = undefined;
  }
}

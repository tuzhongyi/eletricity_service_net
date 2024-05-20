import { EventEmitter } from '@angular/core';
import { VideoModel } from 'src/app/models/video.model';

export interface IndexArgs<T> {
  index: number;
  data: T;
}
export class VideoPlayerListEvent {
  seeks: EventEmitter<number>[] = [];
  plays: EventEmitter<VideoModel>[] = [];
}

export class VideoPlayerListItem {
  data?: VideoModel;
  seek = new EventEmitter<number>();
  selected = false;
  subtitle = false;
  reserve?: number;
}

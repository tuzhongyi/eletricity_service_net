import { Duration } from 'src/app/models/duration.model';

export enum PlayerState {
  ready = 0,
  playing = 1,
  pause = 2,
  slow = 3,
  fast = 4,
  end = 5,
  opening = 6,
  closing = 7,
  frame = 8,
  closed = 255,
}
export interface WSPlayerEventArgs<T = any> {
  index: number;
  value?: T;
}
export interface WSPlayerSubtitleArgs {
  duration: Duration;
}
export interface SubtitleItem {
  index: number;
  begin: number;
  end: number;
  text: string;
}
export interface SubtitleFirstItem {
  index: number;
  begin: number;
  end: number;
  text: string;
}
export interface TimeArgs {
  current: number;
  min: number;
  max: number;
}

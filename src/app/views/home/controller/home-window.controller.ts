import { Injectable } from '@angular/core';
import { HomeAlarmWindow } from './home-alarm-window.controller';
import { HomePictureWindow } from './home-picture-window.controller';
import { HomeVideoWindow } from './home-video-window.controller';

@Injectable()
export class HomeWindow {
  video = new HomeVideoWindow();
  picture = new HomePictureWindow();
  constructor(public alarm: HomeAlarmWindow) {}
}

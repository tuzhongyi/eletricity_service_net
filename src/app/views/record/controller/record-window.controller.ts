import { Injectable } from '@angular/core';
import { RecordPictureWindow } from './record-picture-window.controller';
import { RecordVideoWindow } from './record-video-window.controller';

@Injectable()
export class RecordWindow {
  video = new RecordVideoWindow();
  picture = new RecordPictureWindow();
  constructor() {}
}

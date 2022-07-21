import { Injectable } from '@angular/core';
import { IndexPictureWindow } from './windows/picture-window.business';
import { IndexVideoWindow } from './windows/video-window.business';

@Injectable()
export class IndexWindowBusiness {
  video: IndexVideoWindow = new IndexVideoWindow();
  picture: IndexPictureWindow = new IndexPictureWindow();
}

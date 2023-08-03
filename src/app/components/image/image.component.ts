import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less'],
})
export class ImageComponent {
  @Input() url?: Promise<string>;
  @Input() full: boolean = false;
}

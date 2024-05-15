import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'howell-people-picture-face',
  templateUrl: './people-picture-face.component.html',
  styleUrls: ['./people-picture-face.component.less'],
})
export class PeoplePictureFaceComponent implements OnInit {
  @Input() src?: string;
  @Input() hover: boolean = false;
  @Input() selected: boolean = false;

  constructor() {}

  error = false;

  @ViewChild('inner') inner?: ElementRef;

  ngOnInit(): void {}

  onload(e: Event) {
    let img = e.target as HTMLImageElement;
    img.style.display = '';
    if (this.inner) {
      let x = img.naturalWidth / img.naturalHeight;
      let width = img.clientWidth;
      let height = width / x;
      this.inner.nativeElement.style.width = `${width}px`;
      this.inner.nativeElement.style.height = `${height}px`;
    }
  }

  onerror(e: Event) {
    this.error = true;
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { ImageControlPolygon } from 'src/app/models/image-control-polygon.model';
import { ImageControlModel } from 'src/app/models/image-control.model';
import { Point } from 'src/app/models/point.model';
import { Size } from 'src/app/models/size.model';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.less'],
})
export class ImageControlComponent implements OnInit, OnChanges, AfterViewInit {
  DeviceStatus = DeviceStatus;

  @Input()
  model?: ImageControlModel;

  @Input()
  nosignal = true;

  @Output()
  Click: EventEmitter<ImageControlModel> = new EventEmitter();

  @ViewChild('canvas')
  canvas?: ElementRef;

  @Input('draw')
  isDraw = false;

  constructor() {}
  ngAfterViewInit(): void {
    if (this.isDraw) {
      this.draw();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      if (this.model) {
        this.image.backgroundImage = `url(${this.model.src})`;
        let img = document.createElement('img');
        img.src = this.model.src;
        img.onerror = () => {
          if (this.model) {
            this.image.backgroundImage += `, url(${this.model.onerror})`;
          }
        };

        if (this.isDraw) {
          this.draw();
        }
      }
    }
    if (changes['isDraw']) {
      if (this.isDraw) this.draw();
      else {
        this.clear();
      }
    }
  }

  draw() {
    if (this.canvas && this.model) {
      let canvas = this.canvas.nativeElement as HTMLCanvasElement;
      let ctx = canvas.getContext('2d')!;

      let size: Size = {
        Width: canvas.offsetWidth,
        Height: canvas.offsetHeight,
      };
      ctx.clearRect(0, 0, size.Width, size.Height);
      canvas.width = size.Width;
      canvas.height = size.Height;

      this.initObjects(ctx, size, this.model.polygon);
    }
  }
  clear() {
    if (this.canvas) {
      let canvas = this.canvas.nativeElement as HTMLCanvasElement;
      let ctx = canvas.getContext('2d')!;
      let size: Size = {
        Width: canvas.offsetWidth,
        Height: canvas.offsetHeight,
      };
      ctx.clearRect(0, 0, size.Width, size.Height);
    }
  }

  initObjects(
    ctx: CanvasRenderingContext2D,
    size: Size,
    objects?: ImageControlPolygon[]
  ) {
    if (objects) {
      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        let text = `${obj.Id} ${obj.Confidence}%`;
        ctx.font = '18px Source Han Sans CN Normal';
        ctx.fillStyle = 'red';
        ctx.fillText(
          text,
          obj.Polygon[0].X * size.Width,
          obj.Polygon[0].Y * size.Height
        );
        this.drawRectangle(ctx, size, obj.Polygon, 'red');
      }
    }
  }

  drawRectangle(
    ctx: CanvasRenderingContext2D,
    size: Size,
    polygon: Point[],
    color: string
  ) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;

    ctx.moveTo(polygon[0].X * size.Width, polygon[0].Y * size.Height);
    for (let i = 1; i < polygon.length; i++) {
      const point = polygon[i];
      ctx.lineTo(point.X * size.Width, point.Y * size.Height);
    }

    ctx.closePath();
    ctx.stroke();
  }

  image = {
    backgroundImage: '',
  };

  ngOnInit(): void {}

  onError(event: Event) {
    if (this.model) {
      (event.target as HTMLImageElement).src = this.model.onerror;
    }
  }

  onClick(event: Event) {
    this.Click.emit(this.model);
    event.stopPropagation();
  }
}

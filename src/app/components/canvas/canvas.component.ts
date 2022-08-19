import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PercentPolygonConverter } from 'src/app/converters/polygon.converter';
import { OperationType } from 'src/app/enums/operation-type.enum';
import { Point } from 'src/app/models/point.model';
import { Polygon } from 'src/app/models/polygon.model';
import { Resolution } from 'src/app/models/resolution.model';
import { CanvasBusiness } from './canvas.business';

@Component({
  selector: 'howell-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.less'],
})
export class CanvasComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input()
  url?: string;
  @Input()
  polygon?: Polygon;
  @Input()
  clear?: EventEmitter<void>;
  @Input()
  load?: EventEmitter<Polygon>;
  @Input()
  fixed: number = 8;

  @Output()
  finish: EventEmitter<Polygon> = new EventEmitter();
  @Output()
  loaded: EventEmitter<void> = new EventEmitter();

  @Input()
  type: OperationType = OperationType.select;

  constructor() {
    // doc.addEventListener("contextmenu", this.oncontextmenu)
  }

  business?: CanvasBusiness;

  @ViewChild('canvas')
  element?: ElementRef;
  canvas?: HTMLCanvasElement;
  handle: EventHandle = {};
  converter = new PercentPolygonConverter();
  resolution!: Resolution;
  drawing = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      if (this.business) {
        this.business.type = this.type;
        this.business.contextStyle();
      }
    }
    if (changes['url']) {
      if (this.url) {
        if (this.business) {
          this.business.clear();
        }
      }
    }
    if (changes['polygon']) {
      if (this.polygon) {
        if (this.business) {
          this.business.polygon = this.converter.from(
            this.polygon,
            this.business.resolution
          );
          this.business.draw();
        }
      }
    }
    if (changes['clear']) {
      if (this.clear) {
        this.clear.subscribe((x) => {
          if (this.business) {
            this.business.clear();
          }
        });
      }
    }
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          if (this.business) {
            this.polygon = x;
            this.business.polygon = this.converter.from(
              x,
              this.business.resolution
            );
            this.business.draw();
          }
        });
      }
    }
  }
  ngAfterViewInit(): void {
    if (this.element) {
      this.canvas = this.element.nativeElement as HTMLCanvasElement;
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.resolution = {
        Width: this.canvas.offsetWidth,
        Height: this.canvas.offsetHeight,
      };
      this.business = new CanvasBusiness(this.canvas, this.resolution);
      this.business.type = this.type;
      this.canvas.addEventListener('contextmenu', this.handle.contextmenu);
      this.loaded.emit();
    }
  }
  ngOnInit(): void {
    this.handle.contextmenu = this.oncontextmenu.bind(this);
    this.handle.keydown = this.onkeydown.bind(this);

    document.addEventListener('keydown', this.handle.keydown);
  }
  ngOnDestroy(): void {
    if (this.canvas) {
      this.canvas.removeEventListener('contextmenu', this.handle.contextmenu);
    }
    document.removeEventListener('keydown', this.handle.keydown);
  }
  onkeydown(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      if (this.business) {
        this.business.clear();
      }
    }
  }
  oncontextmenu(e: Event) {
    try {
      if (this.business) {
        this.business.draw();
        this.drawing = false;
        this.polygon = this.converter.to(
          this.business.polygon,
          this.resolution,
          this.fixed
        );
        this.finish.emit(this.polygon);
        this.firstClick = true;
      }
    } catch (error) {}
    e.preventDefault();
  }
  onmousemove(e: MouseEvent) {
    if (this.drawing === false) return;
    let point = {
      X: e.offsetX,
      Y: e.offsetY,
    };
    if (this.business) {
      this.business.drawing(point);
    }
  }
  firstClick = true;
  onmouseclick(e: any) {
    if (this.firstClick) {
      if (this.business) {
        this.business.clear();
      }
      this.firstClick = false;
    }
    this.drawing = true;
    console.log(e);
    let point: Point = {
      X: e.offsetX,
      Y: e.offsetY,
    };
    if (this.business) {
      this.business.addPoint(point);
    }
  }
}

interface EventHandle {
  contextmenu?: any;
  keydown?: any;
}

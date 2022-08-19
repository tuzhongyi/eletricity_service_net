import { EventEmitter } from '@angular/core';
import { PercentPolygonConverter } from 'src/app/converters/polygon.converter';
import { OperationType } from 'src/app/enums/operation-type.enum';
import { Point } from 'src/app/models/point.model';
import { Polygon } from 'src/app/models/polygon.model';
import { Resolution } from 'src/app/models/resolution.model';

export class CanvasBusiness {
  constructor(canvas: HTMLCanvasElement, resolution: Resolution) {
    this.context = canvas.getContext('2d');
    this.contextStyle();
    this.resolution = resolution;
  }

  context: CanvasRenderingContext2D | null;

  resolution: Resolution;
  type: OperationType = OperationType.select;

  private _polygon: Polygon = new Polygon();
  public get polygon(): Polygon {
    return this._polygon;
  }
  public set polygon(v: Polygon) {
    this._polygon = v;
  }

  contextStyle() {
    if (this.context) {
      this.context.strokeStyle = this.getColor();
      this.context.lineWidth = 2;
      this.context.fillStyle = this.getColor(true);
    }
  }

  private initEventHandle() {}

  private getColor(fill: boolean = false) {
    switch (this.type) {
      case OperationType.create:
        return fill ? 'rgba(255,0,0,0.2)' : 'red';
      case OperationType.update:
        return fill ? 'rgba(255,255,0,0.2)' : 'orange';
      case OperationType.select:
      default:
        return fill ? 'rgba(0,0,255,0.2)' : 'blue';
    }
  }

  clear() {
    if (this.context) {
      this.context.clearRect(
        0,
        0,
        this.resolution.Width,
        this.resolution.Height
      );
      this.polygon = new Polygon();
    }
  }

  draw() {
    if (this.context) {
      if (this.polygon.Points.length > 0) {
        let first = this.polygon.Points[0];
        this.context.clearRect(
          0,
          0,
          this.resolution.Width,
          this.resolution.Height
        );
        this.context.beginPath();

        this.context.moveTo(first.X, first.Y);
        for (let i = 1; i < this.polygon.Points.length; i++) {
          const point = this.polygon.Points[i];
          this.context.lineTo(point.X, point.Y);
        }

        this.context.closePath();

        this.context.stroke();
        this.context.fill();
      }
    }
  }

  drawing(point: Point) {
    if (this.context) {
      if (this.polygon.Points.length > 0) {
        let first = this.polygon.Points[0];
        this.context.clearRect(
          0,
          0,
          this.resolution.Width,
          this.resolution.Height
        );
        this.context.beginPath();

        this.context.moveTo(first.X, first.Y);
        for (let i = 1; i < this.polygon.Points.length; i++) {
          const point = this.polygon.Points[i];
          this.context.lineTo(point.X, point.Y);
        }

        this.context.lineTo(point.X, point.Y);

        this.context.stroke();
        this.context.fill();
      }
    }
  }

  addPoint(point: Point) {
    console.log(point);
    this.polygon.Points.push(point);
  }
}

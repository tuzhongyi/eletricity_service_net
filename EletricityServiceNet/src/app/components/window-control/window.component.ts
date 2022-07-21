import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceStatus } from 'src/app/enums/device-status.enum';

import { WindowViewModel } from './window.model';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.less'],
})
export class WindowComponent implements OnInit {
  @Input()
  model: WindowViewModel = {
    show: false,
  };

  @Input()
  background = true;
  @Input()
  title: string = '';

  @Input()
  closeButton = true;

  private _style: any = {
    width: '80%',
    height: '80%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  };
  public get style(): any {
    return this._style;
  }
  @Input()
  public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }

  @Output()
  OnClosing: EventEmitter<boolean> = new EventEmitter();

  @Input()
  status?: DeviceStatus;

  @Input()
  manualClose = false;

  constructor() {}

  ngOnInit() {}

  closeButtonClick() {
    if (this.manualClose === false) {
      this.model.show = false;
    }
    this.OnClosing.emit(true);
  }
}

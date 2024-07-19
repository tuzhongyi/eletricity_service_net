import { EventEmitter } from '@angular/core';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import {
  HowellPlaybackArgs,
  HowellPreviewArgs,
} from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { TrackConfig } from 'src/app/models/config';
import { IdNameModel } from 'src/app/models/model.interface';
import { EmployeesTrackRecordTableLastCommand } from '../../tables/employees-track-record-table/employees-track-record-table.model';

export class ModelDataSource<T extends IdNameModel> {
  datas: T[] = [];
  private _selected?: T;
  public get selected(): T | undefined {
    return this._selected;
  }
  public set selected(v: T | undefined) {
    this._selected = v;
    this.change.emit(v);
  }
  change: EventEmitter<T> = new EventEmitter();
}

export class EmployeeTrackMedium {
  Picture!: Promise<string>;
  preview: EventEmitter<HowellPreviewArgs> = new EventEmitter();
  playback: EventEmitter<HowellPlaybackArgs> = new EventEmitter();
  command!: EmployeesTrackRecordTableLastCommand;
}
export class EmployeeTrackManagerWindow {
  config = new EmployeeTrackManagerPlaybackConfigWindow();
  clear() {
    this.config.clear();
  }
  close() {
    this.config.show = false;
  }
}
export class EmployeeTrackManagerPlaybackConfigWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }

  style = {
    width: '500px',
    height: '350px',
  };

  model?: TrackConfig;
}

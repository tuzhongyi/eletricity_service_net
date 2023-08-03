import { Component, EventEmitter, OnInit } from '@angular/core';
import { TrackConfig } from 'src/app/models/config';
import { EmployeeTrackRecord } from 'src/app/models/employee-track-record.model';
import default_config from 'src/assets/configs/config.json';
import { EmployeesTableBusiness } from '../../tables/employees-table/employees-table.business';
import { EmployeeModel } from '../../tables/employees-table/employees-table.model';
import {
  EmployeesTrackRecordTableArgs,
  EmployeesTrackRecordTableLastCommand,
} from '../../tables/employees-track-record-table/employees-track-record-table.model';
import { EmployeeTrackManagerBusiness } from './employee-track-manager.business';
import { EmployeeTrackManagerConverter } from './employee-track-manager.converter';
import {
  EmployeeTrackManagerWindow,
  EmployeeTrackMedium,
  ModelDataSource,
} from './employee-track-manager.model';
import { EmployeeTrackManagerService } from './employee-track-manager.service';

@Component({
  selector: 'howell-employee-track-manager',
  templateUrl: './employee-track-manager.component.html',
  styleUrls: ['./employee-track-manager.component.less'],
  providers: [
    EmployeeTrackManagerService,
    EmployeesTableBusiness,
    EmployeeTrackManagerBusiness,
    EmployeeTrackManagerConverter,
  ],
})
export class EmployeeTrackManagerComponent implements OnInit {
  constructor(
    private business: EmployeeTrackManagerBusiness,
    private converter: EmployeeTrackManagerConverter
  ) {
    business.getConfig().then((x) => {
      this.config = x;
      this.autoplay = x.autoplay;
    });
  }

  args: EmployeesTrackRecordTableArgs = new EmployeesTrackRecordTableArgs();
  load: EventEmitter<EmployeesTrackRecordTableArgs> = new EventEmitter();

  employee = new ModelDataSource<EmployeeModel>();
  selected?: EmployeeTrackMedium;
  index?: number;
  count = 0;
  Command = EmployeesTrackRecordTableLastCommand;
  window = new EmployeeTrackManagerWindow();
  config: TrackConfig = default_config.track;

  public get autoplay(): boolean {
    return this.config.autoplay;
  }
  public set autoplay(v: boolean) {
    this.config.autoplay = v;
    this.business.setConfig(this.config);
  }

  ngOnInit(): void {
    this.employee.change.subscribe((x) => {
      this.args.name = x?.Name;
      this.load.emit(this.args);
    });
    this.loadData();
  }

  loadData() {
    this.business.employee.load().then((x) => {
      this.employee.datas = x;
      if (!this.employee.selected && this.employee.datas.length > 0) {
        this.employee.selected = this.employee.datas[0];
        this.args.name = this.employee.selected.Name;
        this.load.emit(this.args);
      }
    });
  }
  onloaded(datas: EmployeeTrackRecord[]) {
    this.count = datas.length;
  }
  onsearch() {
    this.load.emit(this.args);
  }
  onimage(item: EmployeeTrackRecord) {
    this.selected = this.converter.convert(item);
    this.selected.command = EmployeesTrackRecordTableLastCommand.image;
  }
  async onvideo(item: EmployeeTrackRecord) {
    this.selected = this.converter.convert(item);
    this.selected.command = EmployeesTrackRecordTableLastCommand.video;
    if (item.ResourceId) {
      let model = await this.business.playback(item.ResourceId, item.EventTime);
      this.selected.play.emit(model);
    }
  }

  onnext() {
    if (this.index === undefined) return;
    if (this.index + 1 >= this.count) return;
    this.index++;
  }
  onprov() {
    if (this.index === undefined) return;
    if (this.index === 0) return;
    this.index--;
  }
  onstop() {
    if (this.autoplay) {
      this.onnext();
    }
  }

  windowclose() {
    this.window.clear();
    this.window.close();
  }

  tosetting() {
    this.window.config.model = this.config;
    this.window.config.show = true;
  }
  onconfig(config: TrackConfig) {
    this.config = config;
    this.business.setConfig(config);
    this.windowclose();
  }
}

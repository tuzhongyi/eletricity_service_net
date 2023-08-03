import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { EmployeeTrackRecord } from 'src/app/models/employee-track-record.model';
import { IModel } from 'src/app/models/model.interface';
import { EmployeesTrackRecordTableBusiness } from './employees-track-record-table.business';
import {
  EmployeesTrackRecordTableArgs,
  EmployeesTrackRecordTableLastCommand,
} from './employees-track-record-table.model';

@Component({
  selector: 'howell-employees-track-record-table',
  templateUrl: './employees-track-record-table.component.html',
  styleUrls: [
    '../table-list.less',
    './employees-track-record-table.component.less',
  ],
  providers: [EmployeesTrackRecordTableBusiness],
})
export class EmployeesTrackRecordTableComponent implements OnInit, OnChanges {
  @Input() business: IBusiness<IModel, EmployeeTrackRecord[]>;
  @Input() init: boolean = true;
  @Input() args: EmployeesTrackRecordTableArgs =
    new EmployeesTrackRecordTableArgs();
  @Input() load?: EventEmitter<EmployeesTrackRecordTableArgs>;
  @Input() index?: number;
  @Output() indexChange: EventEmitter<number> = new EventEmitter();
  @Output() loaded: EventEmitter<EmployeeTrackRecord[]> = new EventEmitter();
  @Output() video: EventEmitter<EmployeeTrackRecord> = new EventEmitter();
  @Output() image: EventEmitter<EmployeeTrackRecord> = new EventEmitter();

  constructor(business: EmployeesTrackRecordTableBusiness) {
    this.business = business;
  }

  datas: EmployeeTrackRecord[] = [];
  selected?: EmployeeTrackRecord;

  widths = ['30%', '55%', '15%'];

  command?: EmployeesTrackRecordTableLastCommand;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData();
      });
    }
    if (this.init) {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('index' in changes) {
      if (
        this.index !== undefined &&
        this.index >= 0 &&
        this.datas.length > 0 &&
        this.index < this.datas.length
      ) {
        this.selected = this.datas[this.index];
        switch (this.command) {
          case EmployeesTrackRecordTableLastCommand.image:
            this.onimage(this.selected, this.index);
            break;
          case EmployeesTrackRecordTableLastCommand.video:
            this.onvideo(this.selected, this.index);
            break;

          default:
            break;
        }
      }
    }
  }

  loadData() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }

  onvideo(item: EmployeeTrackRecord, index: number) {
    this.selected = item;
    this.index = index;
    this.indexChange.emit(index);
    this.video.emit(item);
    this.command = EmployeesTrackRecordTableLastCommand.video;
  }
  onimage(item: EmployeeTrackRecord, index: number) {
    this.selected = item;
    this.index = index;
    this.indexChange.emit(index);
    this.image.emit(item);
    this.command = EmployeesTrackRecordTableLastCommand.image;
  }
}

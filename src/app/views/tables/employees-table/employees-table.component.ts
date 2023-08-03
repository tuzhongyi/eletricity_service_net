import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { Language } from 'src/app/tools/language';
import { EmployeesTableBusiness } from './employees-table.business';
import { EmployeeModel, EmployeeTableArgs } from './employees-table.model';

@Component({
  selector: 'howell-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['../table.less', './employees-table.component.less'],
  providers: [EmployeesTableBusiness],
})
export class EmployeesTableComponent
  implements IComponent<IModel, EmployeeModel[]>, OnInit
{
  @Input() business: IBusiness<IModel, EmployeeModel[]>;
  @Input() args: EmployeeTableArgs = new EmployeeTableArgs();
  @Input() load?: EventEmitter<EmployeeTableArgs>;
  @Output() loaded: EventEmitter<EmployeeModel[]> = new EventEmitter();
  @Output() details: EventEmitter<EmployeeModel> = new EventEmitter();
  @Output() remove: EventEmitter<EmployeeModel> = new EventEmitter();
  @Output() image: EventEmitter<EmployeeModel> = new EventEmitter();
  constructor(business: EmployeesTableBusiness) {
    this.business = business;
  }

  datas?: EmployeeModel[];

  widths = [];

  Language = Language;

  ngOnInit(): void {
    this.loadData();
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData();
      });
    }
  }

  loadData() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
      // this.datas.sort((a, b) => {
      //   return b.time.localeCompare(a.time);
      // });
      this.loaded.emit(x);
    });
  }

  ondetails(item: EmployeeModel) {
    this.details.emit(item);
  }
  onremove(item: EmployeeModel) {
    this.remove.emit(item);
  }
  onimage(item: EmployeeModel) {
    this.image.emit(item);
  }
}

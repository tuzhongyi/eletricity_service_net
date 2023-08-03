import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { GenderType } from 'src/app/enums/gender-type.enum';
import {
  EmployeeModel,
  EmployeeTableArgs,
} from 'src/app/views/tables/employees-table/employees-table.model';
import { EmployeesManagerIndexBusiness } from './employees-manager-index.business';
import {
  EmployeeManagerCommand,
  EmployeeManagerWindow,
} from './employees-manager-index.model';

@Component({
  selector: 'howell-employees-manager-index',
  templateUrl: './employees-manager-index.component.html',
  styleUrls: ['../../confirm.less', './employees-manager-index.component.less'],
  providers: [EmployeesManagerIndexBusiness],
})
export class EmployeesManagerIndexComponent implements OnInit {
  constructor(
    private business: EmployeesManagerIndexBusiness,
    private toastr: ToastrService
  ) {}

  args: EmployeeTableArgs = new EmployeeTableArgs();
  load: EventEmitter<EmployeeTableArgs> = new EventEmitter();
  Gender = GenderType;
  window = new EmployeeManagerWindow();
  Command = EmployeeManagerCommand;
  ngOnInit(): void {}

  tocreate() {
    this.window.details.model = new EmployeeModel();
    this.window.details.show = true;
  }
  toupdate(model: EmployeeModel) {
    this.window.details.model = model;
    this.window.details.show = true;
  }
  toremove(model: EmployeeModel) {
    this.window.confirm.command = EmployeeManagerCommand.remove;
    this.window.confirm.model = model;
    this.window.confirm.show = true;
  }
  tosync() {
    this.window.confirm.clear();
    this.window.confirm.command = EmployeeManagerCommand.sync;
    this.window.confirm.show = true;
  }
  tosyncqustion() {
    this.window.confirm.command = EmployeeManagerCommand.sync_qustion;
    this.window.confirm.show = true;
  }

  onsearch() {
    this.load.emit(this.args);
  }

  windowclose() {
    this.window.clear();
    this.window.close();
  }
  onimage(model: EmployeeModel) {
    this.window.image.model = model;
    this.window.image.show = true;
  }
  ondetails(model: EmployeeModel) {
    this.window.details.model = model;
    this.window.details.show = true;
  }
  onremove(model: EmployeeModel) {
    this.business
      .remove(model)
      .then((x) => {
        this.toastr.success('删除成功');
        this.windowclose();
        this.load.emit(this.args);
      })
      .catch((x) => {
        this.toastr.error('删除失败');
        console.error(x);
      });
  }
  onsync(args: boolean) {
    this.business
      .sync(args)
      .then((x) => {
        this.toastr.success('同步成功');
        this.load.emit(this.args);
      })
      .catch((x) => {
        this.toastr.error('同步失败');
        console.error(x);
      });
    this.windowclose();
  }
  oncommand(command: EmployeeManagerCommand, model?: EmployeeModel) {
    switch (command) {
      case EmployeeManagerCommand.remove:
        this.onremove(model!);
        break;
      case EmployeeManagerCommand.sync:
        this.windowclose();
        timer(1 * 500).subscribe((x) => {
          this.tosyncqustion();
        });
        break;
      default:
        break;
    }
  }
  onok() {
    this.load.emit(this.args);
    this.windowclose();
  }
}

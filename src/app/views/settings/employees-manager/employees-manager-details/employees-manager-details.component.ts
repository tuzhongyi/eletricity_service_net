import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeModel } from 'src/app/views/tables/employees-table/employees-table.model';
import { EmployeesManagerDetailsBusiness } from './employees-manager-details.business';

@Component({
  selector: 'howell-employees-manager-details',
  templateUrl: './employees-manager-details.component.html',
  styleUrls: ['./employees-manager-details.component.less'],
  providers: [EmployeesManagerDetailsBusiness],
})
export class EmployeesManagerDetailsComponent implements OnInit {
  @Input() model?: EmployeeModel;
  @Output() ok: EventEmitter<Employee> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(
    private business: EmployeesManagerDetailsBusiness,
    private toastr: ToastrService
  ) {}

  Gender = GenderType;

  ngOnInit(): void {}
  image?: string;

  async onok() {
    if (this.model && this.check()) {
      let promise: Promise<Employee>;
      if (this.image) {
        let result = await this.business.upload(this.image);
        this.model.PictureId = result.Id;
      }

      if (this.model.Id) {
        promise = this.business.update(this.model);
      } else {
        this.model.Id = Guid.NewGuid().ToString('N');
        promise = this.business.create(this.model);
      }
      promise
        .then((x) => {
          this.toastr.success('操作成功');
        })
        .catch((x) => {
          console.error(x);
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.ok.emit(this.model);
        });
    }
  }

  oncancel() {
    this.cancel.emit();
  }

  onimage(image: string) {
    this.image = image;
  }

  check() {
    if (this.model) {
      if (!this.model.Id && !this.image) {
        this.toastr.warning('请上传员工照片');
        return false;
      }
      if (!this.model.Name) {
        this.toastr.warning('请填写员工姓名');
        return false;
      }
      return true;
    }
    return false;
  }
}

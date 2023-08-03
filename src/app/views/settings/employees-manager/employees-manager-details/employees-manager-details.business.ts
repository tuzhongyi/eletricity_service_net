import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { Medium } from 'src/app/network/request/medium/medium';
import { StoreService } from 'src/app/tools/service/store.service';
import { EmployeeModel } from 'src/app/views/tables/employees-table/employees-table.model';

@Injectable()
export class EmployeesManagerDetailsBusiness {
  constructor(
    private service: BusinessHallRequestService,
    private medium: Medium,
    private store: StoreService
  ) {}

  async create(model: EmployeeModel) {
    let hall = await this.store.getBusinessHall();
    model.HallId = hall.Id;
    return this.service.employee.create(model);
  }
  update(model: EmployeeModel) {
    return this.service.employee.update(model);
  }
  upload(image: string) {
    let data = image;
    let index = image.indexOf('base64');
    if (index >= 0) {
      data = image.substring(index + 7);
    }
    return this.medium.upload(data);
  }
}

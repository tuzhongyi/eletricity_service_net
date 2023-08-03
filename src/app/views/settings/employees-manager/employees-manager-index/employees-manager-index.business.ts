import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { EmployeeModel } from 'src/app/views/tables/employees-table/employees-table.model';

@Injectable()
export class EmployeesManagerIndexBusiness {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}

  async remove(item: EmployeeModel) {
    let hall = await this.store.getBusinessHall();
    return this.service.employee.remove(hall.Id, item.Id);
  }
  async sync(deleteNotMatchItems: boolean) {
    let hall = await this.store.getBusinessHall();
    return this.service.syncFaceSet(hall.Id, deleteNotMatchItems);
  }
}

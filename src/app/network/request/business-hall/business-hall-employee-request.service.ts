import { Employee } from 'src/app/models/employee.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';

export class BusinessHallEmployeeRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(Employee);
  }
  type: BaseTypeRequestService<Employee>;
  array(hallId: string) {
    let url = BusinessHallsUrl.empolyee(hallId).basic();
    return this.type.array(url);
  }
  create(model: Employee) {
    let url = BusinessHallsUrl.empolyee(model.HallId!).basic();
    return this.type.post(url, model);
  }

  get(hallId: string, employeeId: string) {
    let url = BusinessHallsUrl.empolyee(hallId).item(employeeId);
    return this.type.get(url);
  }
  update(model: Employee) {
    let url = BusinessHallsUrl.empolyee(model.HallId!).item(model.Id);
    return this.type.put(url, model);
  }
  remove(hallId: string, employeeId: string) {
    let url = BusinessHallsUrl.empolyee(hallId).item(employeeId);
    return this.type.delete(url);
  }
}

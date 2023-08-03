import { Exclude } from 'class-transformer';
import { GenderType } from 'src/app/enums/gender-type.enum';
import { Employee } from 'src/app/models/employee.model';

export class EmployeeTableArgs {
  name?: string;
  idnumber?: string;
  gender?: GenderType;
  job?: string;
}

export class EmployeeModel extends Employee {
  @Exclude()
  Picture!: Promise<string>;
  @Exclude()
  GenderView: string = '';
  @Exclude()
  BirthDateView: string = '';
}

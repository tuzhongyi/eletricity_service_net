import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { EventType } from 'src/app/enums/event-type.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { Employee } from 'src/app/models/employee.model';
import { EventRecord } from 'src/app/models/event-record.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { Medium } from 'src/app/network/request/medium/medium';
import { Language } from 'src/app/tools/language';
import { StoreService } from 'src/app/tools/service/store.service';
import { EmployeeModel, EmployeeTableArgs } from './employees-table.model';

@Injectable()
export class EmployeesTableBusiness
  implements IBusiness<Employee[], EmployeeModel[]>
{
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}

  async load(args?: EmployeeTableArgs): Promise<EmployeeModel[]> {
    let hall = await this.store.getBusinessHall();
    let data = await this.getData(hall.Id).catch((x) => {
      let array = new Array();
      for (let i = 0; i < 20; i++) {
        let record = new EventRecord();
        record.Id = i.toString();
        record.ResourceName = '记录' + i;
        record.EventTime = new Date();
        record.FloorName = i + 'F';
        record.EventType = EventType.Business;
        array.push(record);
      }
      return array;
    });
    if (args) {
      data = this.filter(data, args);
    }
    let model = data.map((x) => this.convert(x));
    return model;
  }

  getData(hallId: string): Promise<Employee[]> {
    return this.service.employee.array(hallId);
  }

  filter(source: Employee[], args: EmployeeTableArgs) {
    let data = [...source];
    if (args.gender) {
      data = data.filter((x) => x.Gender === args.gender);
    }
    if (args.name) {
      data = data.filter((x) =>
        x.Name.toLowerCase().includes(args.name!.toLowerCase())
      );
    }
    if (args.idnumber) {
      data = data.filter((x) => {
        x.IDNumber?.toLowerCase()?.includes(args.idnumber!.toLowerCase());
      });
    }
    if (args.job) {
      data = data.filter((x) => x.JobTitle === args.job);
    }
    return data;
  }

  convert(source: Employee, ...res: any[]): EmployeeModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(EmployeeModel, plain);
    model.Picture = Medium.img(source.PictureId).then((x) => x.url);
    model.GenderView = Language.Gender(source.Gender);
    if (source.BirthDate) {
      model.BirthDateView = formatDate(source.BirthDate, 'yyyy-MM-dd', 'en');
    }
    return model;
  }
}

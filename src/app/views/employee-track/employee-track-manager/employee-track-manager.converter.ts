import { Injectable } from '@angular/core';
import { EmployeeTrackRecord } from 'src/app/models/employee-track-record.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { EmployeeTrackMedium } from './employee-track-manager.model';

@Injectable()
export class EmployeeTrackManagerConverter {
  convert(source: EmployeeTrackRecord) {
    let model = new EmployeeTrackMedium();
    model.Picture = Medium.img(source.ImageUrl).then((x) => x.url);
    return model;
  }
}

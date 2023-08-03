import { Component, Input, OnInit } from '@angular/core';
import { EmployeeModel } from '../../tables/employees-table/employees-table.model';

@Component({
  selector: 'howell-employee-track-simple-info',
  templateUrl: './employee-track-simple-info.component.html',
  styleUrls: ['./employee-track-simple-info.component.less'],
})
export class EmployeeTrackSimpleInfoComponent implements OnInit {
  @Input() model?: EmployeeModel;

  constructor() {}

  ngOnInit(): void {}
}

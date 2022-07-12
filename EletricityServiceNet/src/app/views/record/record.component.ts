import { Component, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/directives/date-time-picker.directive';

@Component({
  selector: 'howell-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
})
export class RecordComponent implements OnInit {
  constructor() {}

  date: Date = new Date();
  DateTimePickerView = DateTimePickerView;

  ngOnInit(): void {}

  changeDate(date: Date) {
    this.date = date;
  }
}

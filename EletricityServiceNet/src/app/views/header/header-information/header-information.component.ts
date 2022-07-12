import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'howell-header-information',
  templateUrl: './header-information.component.html',
  styleUrls: ['./header-information.component.less'],
})
export class HeaderInformationComponent implements OnInit {
  constructor() {}

  date: Date = new Date();

  ngOnInit(): void {}
}

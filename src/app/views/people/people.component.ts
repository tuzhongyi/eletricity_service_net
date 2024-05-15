import { Component, OnInit } from '@angular/core';
import { PeopleNavigation } from './people.model';

@Component({
  selector: 'howell-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.less'],
})
export class PeopleComponent implements OnInit {
  constructor() {}

  navigation = PeopleNavigation.stranger;
  Navigation = PeopleNavigation;
  ngOnInit(): void {}
}

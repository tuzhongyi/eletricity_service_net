import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationPath } from './navigarion-path.enum';

@Component({
  selector: 'howell-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.less'],
})
export class HeaderNavigationComponent implements OnInit {
  @Input()
  path: NavigationPath = NavigationPath.employee_track;
  @Output()
  changed: EventEmitter<NavigationPath> = new EventEmitter();

  constructor() {}
  NavigationPath = NavigationPath;

  ngOnInit(): void {}

  onchanged(path: NavigationPath) {
    this.path = path;
    this.changed.emit(this.path);
  }
}

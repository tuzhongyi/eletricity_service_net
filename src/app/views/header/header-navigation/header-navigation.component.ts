import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreService } from 'src/app/tools/service/store.service';
import { NavigationPath } from './navigarion-path.enum';

@Component({
  selector: 'howell-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.less'],
})
export class HeaderNavigationComponent implements OnInit {
  @Input()
  path: NavigationPath = NavigationPath.video;
  @Output()
  changed: EventEmitter<NavigationPath> = new EventEmitter();

  constructor(public store: StoreService) {}
  NavigationPath = NavigationPath;

  ngOnInit(): void {}

  onchanged(path: NavigationPath) {
    this.path = path;
    this.changed.emit(this.path);
  }
}

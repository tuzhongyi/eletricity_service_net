import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { EnumTool } from 'src/app/tools/enum-tool/enum.tool';
import { StoreService } from 'src/app/tools/service/store.service';
import { NavigationPath } from './navigarion-path.enum';

@Component({
  selector: 'howell-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.less'],
})
export class HeaderNavigationComponent implements OnInit {
  @Input()
  path: NavigationPath = NavigationPath.statistic;
  @Output()
  changed: EventEmitter<NavigationPath> = new EventEmitter();

  constructor(public store: StoreService, private router: Router) {}
  NavigationPath = NavigationPath;

  ngOnInit(): void {
    this.regist();
    this.load();
  }

  private regist() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.load();
    });
  }

  private load() {
    let paths = EnumTool.values(NavigationPath);
    paths.forEach((path) => {
      if (location.pathname.indexOf(path) > -1) {
        this.onchanged(path);
      }
    });
  }

  onchanged(path: NavigationPath) {
    this.path = path;
    this.changed.emit(this.path);
  }
}

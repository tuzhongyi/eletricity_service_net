import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { RoutePath } from 'src/app/app-routing.path';
import { SettingPath, SettingPathNode } from '../setting.model';

@Component({
  selector: 'howell-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router) {}

  path?: SettingPath;
  Path = SettingPath;
  Node = SettingPathNode;

  ngOnInit(): void {
    this.path = location.pathname.substring(1);
    this.load();
  }
  private load() {
    (
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
      ) as Observable<NavigationEnd>
    ).subscribe((router) => {
      this.path = location.pathname.substring(1);
    });
  }
  on = {
    path: (path: SettingPathNode) => {
      this.router.navigateByUrl(`index/${RoutePath.setting}/${path}`);
    },
  };
}

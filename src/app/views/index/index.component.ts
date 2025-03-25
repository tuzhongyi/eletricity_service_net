import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoutePath } from 'src/app/app-routing.path';
import { CookieKey } from 'src/app/enums/cookie-key.enum';
import { CurrentBusinessHallStatistic } from 'src/app/models/current-business-hall-statistic.model';
import { StoreService } from 'src/app/tools/service/store.service';
import { NavigationPath } from '../header/header-navigation/navigarion-path.enum';
import { RealtimePassengerInfo } from '../realtime/realtime-information/realtime-information.model';

import { IndexBusiness } from './business/index.business';

@Component({
  selector: 'howell-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [IndexBusiness],
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(
    private titleService: Title,
    private business: IndexBusiness,
    private store: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {}
  ngOnDestroy(): void {
    this.store.stopInterval();
  }
  title: string = '';
  path: NavigationPath = NavigationPath.statistic;
  NavigationPath = NavigationPath;
  current?: CurrentBusinessHallStatistic;
  date: Date = new Date();
  passenger: RealtimePassengerInfo = new RealtimePassengerInfo();
  head = {
    show: true,
  };

  async ngOnInit() {
    if (!this.cookie.get(CookieKey.username)) {
      this.router.navigateByUrl(RoutePath.login);
      return;
    }

    this.store.runInterval();
    this.route.queryParams.subscribe((params) => {
      for (const key in params) {
        let lower = key.toLocaleLowerCase();
        if (lower == 'config') {
          this.path = NavigationPath.setting;
          this.router.navigateByUrl(`/index/${this.path}`);
        }
      }
    });
    let hall = await this.store.getBusinessHall();
    this.title = hall.Name;
    this.titleService.setTitle(hall.Name);
    this.current = await this.business.current(hall.Id);
    this.date = this.current.Time;
  }

  onnavigate(path: NavigationPath) {
    this.path = path;
    if (this.path === NavigationPath.statistic) {
      this.store.runInterval();
    } else {
      this.store.stopInterval();
    }
    this.router.navigateByUrl(`/index/${this.path}`);
  }
  onheaddisplay() {
    this.head.show = !this.head.show;
  }
}

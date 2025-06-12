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
  NavigationPath = NavigationPath;
  current?: CurrentBusinessHallStatistic;
  date: Date = new Date();
  passenger: RealtimePassengerInfo = new RealtimePassengerInfo();
  head = {
    show: true,
  };

  ngOnInit() {
    if (!this.cookie.get(CookieKey.username)) {
      this.router.navigateByUrl(RoutePath.login);
      return;
    }

    this.store.runInterval();
    this.route.queryParams.subscribe((params) => {
      for (const key in params) {
        let lower = key.toLocaleLowerCase();
        if (lower == 'config') {
          this.router.navigateByUrl(`/index/${NavigationPath.setting}`);
        }
      }
    });
    this.store.getBusinessHall().then((hall) => {
      this.title = hall.Name;
      this.titleService.setTitle(hall.Name);

      this.business.current(hall.Id).then((current) => {
        this.current = current;
        this.date = this.current.Time;
      });
    });
  }

  onnavigate(path: NavigationPath) {
    if (path === NavigationPath.statistic) {
      this.store.runInterval();
    } else {
      this.store.stopInterval();
    }
    if (location.pathname.indexOf(path) < 0) {
      this.router.navigateByUrl(`/index/${path}`);
    }
  }
  onheaddisplay() {
    this.head.show = !this.head.show;
  }
}

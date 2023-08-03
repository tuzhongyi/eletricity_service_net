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
import { IndexEventTriggerBusiness } from './business/event-trigger.business';
import { IndexWindowBusiness } from './business/index-window.business';
import { IndexBusiness } from './business/index.business';

@Component({
  selector: 'howell-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [IndexBusiness, IndexWindowBusiness, IndexEventTriggerBusiness],
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(
    private titleService: Title,
    private business: IndexBusiness,
    private store: StoreService,
    public window: IndexWindowBusiness,
    public trigger: IndexEventTriggerBusiness,
    private route: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {}
  ngOnDestroy(): void {
    this.store.stopInterval();
  }
  title: string = '';
  path: NavigationPath = NavigationPath.realtime;
  NavigationPath = NavigationPath;
  current?: CurrentBusinessHallStatistic;
  date: Date = new Date();
  passenger: RealtimePassengerInfo = new RealtimePassengerInfo();

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
    if (this.path === NavigationPath.realtime) {
      this.store.runInterval();
    } else {
      this.store.stopInterval();
    }
  }
}

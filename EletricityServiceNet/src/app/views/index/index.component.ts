import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { StoreService } from 'src/app/tools/service/store.service';
import { NavigationPath } from '../header/header-navigation/navigarion-path.enum';
import { IndexEventTriggerBusiness } from './business/event-trigger.business';
import { IndexWindowBusiness } from './business/index-window.business';
import { IndexBusiness } from './business/index.business';

@Component({
  selector: 'howell-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [IndexBusiness, IndexWindowBusiness, IndexEventTriggerBusiness],
})
export class IndexComponent implements OnInit {
  constructor(
    private titleService: Title,
    private business: IndexBusiness,
    private store: StoreService,
    public window: IndexWindowBusiness,
    public trigger: IndexEventTriggerBusiness
  ) {}
  title: string = '';
  path: NavigationPath = NavigationPath.realtime;
  NavigationPath = NavigationPath;
  current?: CurrentDayPassengerFlow;
  async ngOnInit() {
    let hall = await this.store.getBusinessHall();
    this.title = hall.Name;
    this.titleService.setTitle(hall.Name);
    this.current = await this.business.current(hall.Id);
  }

  onnavigate(path: NavigationPath) {
    this.path = path;
  }
}

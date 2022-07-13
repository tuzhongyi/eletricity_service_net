import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StoreService } from 'src/app/tools/service/store.service';
import { NavigationPath } from '../header/header-navigation/navigarion-path.enum';
import { IndexBusiness } from './index.business';

@Component({
  selector: 'howell-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [IndexBusiness],
})
export class IndexComponent implements OnInit {
  constructor(
    private titleService: Title,
    private business: IndexBusiness,
    private store: StoreService
  ) {}
  title: string = '';
  path: NavigationPath = NavigationPath.video;
  NavigationPath = NavigationPath;
  async ngOnInit() {
    let list = await this.business.getHallList();
    if (list.length > 0) {
      this.store.BusinessHall = list[0];
      this.title = this.store.BusinessHall.Name;
      this.titleService.setTitle(this.store.BusinessHall.Name);
    } else {
      this.titleService.setTitle('电力营业厅');
    }
  }

  onnavigate(path: NavigationPath) {
    console.log(path);
    this.path = path;
  }
}

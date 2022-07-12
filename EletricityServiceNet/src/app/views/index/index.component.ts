import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationPath } from '../header/header-navigation/navigarion-path.enum';

@Component({
  selector: 'howell-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('某某电力营业厅');
  }

  path: NavigationPath = NavigationPath.record;
  NavigationPath = NavigationPath;
  ngOnInit(): void {}

  onnavigate(path: NavigationPath) {
    console.log(path);
    this.path = path;
  }
}

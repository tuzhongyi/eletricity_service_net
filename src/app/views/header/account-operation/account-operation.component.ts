import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoutePath } from 'src/app/app-routing.path';
import { CookieKey } from 'src/app/enums/cookie-key.enum';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { AccountOperationDisplay } from './account-operation.model';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
})
export class AccountOperationComponent implements OnInit {
  constructor(
    private store: StoreService,
    private cookie: CookieService,
    private router: Router,
    private config: ConfigRequestService,
  ) {}

  username: string = '';
  display = new AccountOperationDisplay();

  ngOnInit(): void {
    this.username = this.cookie.get(CookieKey.username);
    this.config.get().then((x) => {
      this.display.setting = x.setting ?? false;
    });
  }
  logoutHandler() {
    this.store.clear();
    this.router.navigateByUrl(RoutePath.login);
    this.cookie.deleteAll();
  }
  navigateToHelp() {
    window.open(
      `http://${location.hostname}:${location.port ?? 80}/help/help.html`,
    );
  }
  tosetting() {
    this.router.navigateByUrl(`index/${RoutePath.setting}`);
  }
}

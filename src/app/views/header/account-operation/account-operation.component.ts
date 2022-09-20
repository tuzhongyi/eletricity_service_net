import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountOperationDisplay } from './account-operation.model';
import { StoreService } from 'src/app/tools/service/store.service';
import { RoutePath } from 'src/app/app-routing.path';
import { CookieKey } from 'src/app/enums/cookie-key.enum';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
})
export class AccountOperationComponent implements OnInit {
  constructor(
    private store: StoreService,
    private cookie: CookieService,
    private router: Router
  ) {}

  username: string = '';
  display = new AccountOperationDisplay();

  ngOnInit(): void {
    this.username = this.cookie.get(CookieKey.username);
  }
  logoutHandler() {
    this.store.clear();
    this.router.navigateByUrl(RoutePath.login);
    this.cookie.deleteAll();
  }
  navigateToHelp() {
    window.open(
      `http://${location.hostname}:${location.port ?? 80}/help/help.html`
    );
  }
}

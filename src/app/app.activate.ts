import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfigRequestService } from './network/request/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationActivate implements CanActivate {
  constructor(
    private cookie: CookieService,
    private config: ConfigRequestService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let username = this.cookie.get('username');
    if (username) {
      let config = await this.config.get();
      if (username === config.user.username) {
        return true;
      }
    }

    return this.router.parseUrl('/login');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoutePath } from 'src/app/app-routing.path';
import { CookieKey } from 'src/app/enums/cookie-key.enum';
import { User } from 'src/app/models/user.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'howell-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _toastrService: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private config: ConfigRequestService
  ) {}
  formGroup = new FormGroup({
    username: new FormControl('', [
      Validators.maxLength(15),
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required]),
  });
  get checkForm() {
    if (this.formGroup.get('username')?.invalid) {
      this._toastrService.warning('请输入账号');
      return false;
    }
    if (this.formGroup.get('password')?.invalid) {
      this._toastrService.warning('请输入密码');
      return false;
    }
    return true;
  }
  ngOnInit(): void {}

  async login() {
    if (this.checkForm) {
      let user = new User();
      user.username = this.formGroup.get('username')?.value ?? '';
      user.password = Md5.hashStr(this.formGroup.get('password')?.value ?? '');
      let config = await this.config.get();
      let result = user.username === config.user.username;
      if (!result) {
        this._toastrService.warning('用户名或密码错误');
        return;
      }
      result = user.password === Md5.hashStr(config.user.password);
      if (!result) {
        this._toastrService.warning('用户名或密码错误');
        return;
      }
      this.cookie.set(CookieKey.username, user.username);
      this.router.navigateByUrl(RoutePath.index);
    }
  }
}

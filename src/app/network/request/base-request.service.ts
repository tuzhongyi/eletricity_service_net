import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClassConstructor, classToPlain } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { PagedList } from 'src/app/models/page.model';
import { HowellResponse } from 'src/app/models/response.model';

import { IParams } from './IParams.interface';
import { ServiceHelper } from './service-helper';

export class BaseRequestService {
  constructor(public http: HttpClient) {}
  get<R>(url: string): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      firstValueFrom(this.http.get<R>(url))
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          if (res.status === 200) {
            resolve(res.error.text);
          } else {
            reject(res);
          }
        });
    });
  }
  put<T, R>(url: string, model: T) {
    let data = classToPlain(model) as T;
    return firstValueFrom(this.http.put<R>(url, data));
  }
  post<T, R>(url: string, data: T) {
    return new Promise<R>((resolve, reject) => {
      firstValueFrom(this.http.post<R>(url, data))
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          if (res.status === 200) {
            resolve(res.error.text);
          } else {
            reject(res);
          }
        });
    });
  }
  delete<R>(url: string) {
    return firstValueFrom(this.http.delete<R>(url));
  }
  async howellGet<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.get<HowellResponse<T>>(url);
    return ServiceHelper.ResponseProcess(response, type);
  }
  async howellPut<T>(
    url: string,
    type: ClassConstructor<T>,
    model: T | IParams
  ) {
    let response = await this.put<T | IParams, HowellResponse<T>>(url, model);
    return ServiceHelper.ResponseProcess(response, type);
  }
  async howellPost<T>(url: string): Promise<T>;
  async howellPost<T>(
    url: string,
    type: ClassConstructor<T>,
    params?: IParams
  ): Promise<T>;
  async howellPost<T, R>(
    url: string,
    type: ClassConstructor<T>,
    params?: IParams
  ): Promise<R>;
  async howellPost<T>(
    url: string,
    type: ClassConstructor<T>,
    model?: T
  ): Promise<T>;
  async howellPost<T>(
    url: string,
    type?: ClassConstructor<T>,
    args?: T | IParams | string
  ) {
    if (type === undefined) {
      let observable = this.http.post<T>(url, undefined);
      return firstValueFrom(observable);
    } else {
      let data = classToPlain(args) as T | IParams;
      let response = await firstValueFrom(
        this.http.post<HowellResponse<T>>(url, data)
      );
      return ServiceHelper.ResponseProcess(response, type);
    }
  }

  public postString<T = any, R = HowellResponse<T>>(
    url: string,
    base64: string,
    params?: HttpParams
  ): Promise<R> {
    const httpOptions = {
      params: params,
      'Content-Type': 'text/plain',
    };
    let response = this.http.post<R>(url, base64, httpOptions);
    let promise = firstValueFrom(response);
    return promise;
  }

  async base64<T>(url: string, type: ClassConstructor<T>, base64: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json', //'application/json',
    });
    let response = await firstValueFrom(
      this.http.post<HowellResponse<T>>(url, `\"` + base64 + `\"`, {
        headers: headers,
      })
    );
    return ServiceHelper.ResponseProcess(response, type);
  }

  async howellDelete<T>(url: string, type: ClassConstructor<T>) {
    let response = await this.delete<HowellResponse<T>>(url);
    return ServiceHelper.ResponseProcess(response, type);
  }
  async array<T>(url: string, type: ClassConstructor<T>, params?: IParams) {
    let data: IParams | undefined;
    if (params) {
      data = classToPlain(params) as IParams;
    }
    let response = await firstValueFrom(
      this.http.get<HowellResponse<Array<T>>>(url, data)
    );

    return ServiceHelper.ResponseProcess(response!, type);
  }
  async howellPaged<T>(
    url: string,
    type: ClassConstructor<T>,
    params: IParams
  ) {
    let data = classToPlain(params) as IParams;
    let response = await firstValueFrom(
      this.http.post<HowellResponse<PagedList<T>>>(url, data)
    );
    return ServiceHelper.ResponseProcess(response, type);
  }

  string(url: string) {
    return firstValueFrom(this.http.post<string>(url, undefined));
  }

  type<T>(type: ClassConstructor<T>): BaseTypeRequestService<T> {
    return new BaseTypeRequestService<T>(this, type);
  }
}

export class BaseTypeRequestService<T> {
  constructor(
    private _service: BaseRequestService,
    private type: ClassConstructor<T>
  ) {}

  async get(url: string) {
    return this._service.howellGet(url, this.type);
  }
  async put(url: string, model: T) {
    return this._service.howellPut(url, this.type, model);
  }
  async post(url: string, model?: T): Promise<T>;
  async post(url: string, params?: IParams): Promise<T>;
  async post(url: string, base64?: string): Promise<T>;
  async post(url: string, args?: T | IParams | string) {
    return this._service.howellPost(url, this.type, args);
  }
  async delete(url: string) {
    return this._service.howellDelete(url, this.type);
  }
  async array(url: string, params?: IParams) {
    return this._service.array(url, this.type, params);
  }
  async paged(url: string, params: IParams) {
    return this._service.howellPaged(url, this.type, params);
  }
  async base64(url: string, base64: string) {
    return this._service.base64(url, this.type, base64);
  }
}

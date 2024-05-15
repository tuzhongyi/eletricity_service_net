import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImageResult } from 'src/app/models/image.model';
import { PictureResult } from 'src/app/models/picture-result.model';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';
import { PicturesUrl } from '../../url/medium/pictures/pictures.url';

@Injectable({
  providedIn: 'root',
})
export class Medium {
  constructor(private http: HttpClient) {}

  static default = '/assets/img/timg-pic.jpg';

  static data(id?: string) {
    if (!id) return this.default;
    return PicturesUrl.data(id);
  }

  base64(id: string) {
    let observable = this.http.get(id, { responseType: 'text' });
    return firstValueFrom(observable);
  }

  static img(url?: string): Promise<ImageResult> {
    return new Promise((resolve) => {
      let img = url ? Medium.data(url) : '';
      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve({
          url: UrlTool.image.error,
          error: true,
        });
      };
      image.onload = () => {
        resolve({
          url: img,
          error: false,
        });
      };
    });
  }

  upload(image: string): Promise<PictureResult> {
    let url = PicturesUrl.upload();

    let observable = this.postImage<{ Data: PictureResult }>(url, `"${image}"`);
    let promise = firstValueFrom(observable);

    return promise.then((x) => {
      return x.Data;
    });
  }

  public postImage<T>(url: string, data: string) {
    const heads: HttpHeaders = new HttpHeaders({
      'content-type': 'application/json',
    });
    const httpOptions = {
      headers: heads,
    };
    return this.http.post<T>(url, data, httpOptions);
  }
}

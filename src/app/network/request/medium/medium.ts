import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

  static img(url?: string): Promise<{ url: string; error: boolean }> {
    return new Promise((resolve) => {
      let img = url ? Medium.data(url) : '';
      var image = new Image();
      image.src = img;
      image.onerror = () => {
        resolve({
          url: '/assets/images/image-error.png',
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
}

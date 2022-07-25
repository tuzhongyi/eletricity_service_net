import { PicturesUrl } from '../../url/medium/pictures/pictures.url';

export class Medium {
  constructor() {}

  static default = '/assets/img/timg-pic.jpg';

  static data(id?: string) {
    if (!id) return this.default;
    return PicturesUrl.data(id);
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

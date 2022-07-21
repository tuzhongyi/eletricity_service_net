import { MediumUrl } from '../medium.url';

export abstract class PicturesUrl extends MediumUrl {
  protected static override get basic(): string {
    return `${super.basic}/Pictures`;
  }
  static create() {
    return this.basic;
  }

  static item(id: string) {
    return `${this.basic}/${id}`;
  }
  static data(id: string) {
    return `${this.item(id)}/Data`;
  }
}

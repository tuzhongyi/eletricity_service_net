import { AppCache } from './app.cache';

export class ServicePool {
  static [key: string]: AppCache;
}

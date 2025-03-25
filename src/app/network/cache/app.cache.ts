class AppCacheData {
  [key: string]: any;
}

export class AppCache {
  constructor(public timeout: number) {}
  private static data = new AppCacheData();

  private countdown(key: string, timeout: number) {
    setTimeout(() => {
      this.del(key);
    }, timeout);
  }
  get(key: string) {
    return AppCache.data[key];
  }
  set(key: string, value: any, timeout: number) {
    AppCache.data[key] = value;
    this.countdown(key, timeout);
  }
  del(key: string) {
    delete AppCache.data[key];
  }
  reset() {
    AppCache.data = new AppCacheData();
  }
}

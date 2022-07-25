import {
  businesshall_service_url,
  InnerUrl,
} from '../businesshall_service.url';

export class EventUrl {
  static basic() {
    return `${businesshall_service_url}/Events`;
  }

  static record() {
    return new EventRecordsUrl(this.basic());
  }
}
class EventRecordsUrl implements InnerUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}/Records`;
  }

  list(): string {
    return `${this.basic()}/List`;
  }
}

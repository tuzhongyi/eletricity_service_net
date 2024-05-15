import { businesshall_service_url } from '../basic.url';

export class SRServerUrl {
  static basic() {
    return `${businesshall_service_url}/SRServers`;
  }
  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static sync(id: string) {
    return `${this.item(id)}/Sync`;
  }
  static preview() {
    return `${this.basic()}/PreviewUrls`;
  }
  static vod() {
    return `${this.basic()}/VodUrls`;
  }
}

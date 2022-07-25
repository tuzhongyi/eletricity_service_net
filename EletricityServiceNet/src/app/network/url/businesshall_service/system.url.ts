import { businesshall_service_url } from '../businesshall_service.url';

export class SystemUrl {
  static basic() {
    return `${businesshall_service_url}/System`;
  }

  static version() {
    return `${SystemUrl.basic()}/Version`;
  }
}

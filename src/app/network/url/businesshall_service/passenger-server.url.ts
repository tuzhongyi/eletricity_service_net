import { businesshall_service_url } from '../businesshall_service.url';

export class PassengerServerUrl {
  static basic() {
    return `${businesshall_service_url}/PassengerServers`;
  }

  static item(id: string) {
    return `${this.basic()}/${id}`;
  }

  static sync(id: string) {
    return `${this.item(id)}/Sync`;
  }
}

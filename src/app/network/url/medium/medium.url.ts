import { aiop_service_url } from '../basic.url';

export abstract class MediumUrl {
  protected static get basic(): string {
    return `${aiop_service_url}/Medium`;
  }
}

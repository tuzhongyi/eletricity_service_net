import { aiop_url } from '../businesshall_service.url';

export abstract class MediumUrl {
  protected static get basic(): string {
    return `${aiop_url}/Medium`;
  }
}

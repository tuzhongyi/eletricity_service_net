import { businesshall_service_url } from '../basic.url';
import { IInnerUrl } from '../businesshall_service.url';

export class AnalysisServerUrl {
  static basic() {
    return `${businesshall_service_url}/AnalysisServers`;
  }

  static item(id: string) {
    return `${this.basic()}/${id}`;
  }

  static sync(id: string) {
    return `${this.item(id)}/Sync`;
  }

  static audio(id: string) {
    return new AnalysisServerAudioSourceUrl(this.item(id));
  }
}

class AnalysisServerAudioSourceUrl implements IInnerUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}/AudioSources`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
}

import { Injectable } from '@angular/core';
import { AnalysisServerRequestService } from 'src/app/network/request/analysis/analysis-request.service';

@Injectable()
export class SettingsServiceAnalysisBusiness {
  constructor(private service: AnalysisServerRequestService) {}

  sync(id: string) {
    this.service.sync(id);
  }
  get() {
    return this.service.array();
  }
}

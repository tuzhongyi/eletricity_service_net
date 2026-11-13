import { Component, Input } from '@angular/core';
import { AnalysisServer } from 'src/app/models/analysis-server.model';
import { Language } from 'src/app/tools/language';

@Component({
  selector: 'howell-settings-service-analysis-server-info',
  templateUrl: './settings-service-analysis-server-info.component.html',
  styleUrls: ['./settings-service-analysis-server-info.component.less'],
})
export class SettingsServiceAnalysisServerInfoComponent {
  @Input() data!: AnalysisServer;

  get status() {
    if (!this.data || this.data.Status == undefined) return '未知';
    return Language.DeviceStatus(this.data.Status);
  }
}

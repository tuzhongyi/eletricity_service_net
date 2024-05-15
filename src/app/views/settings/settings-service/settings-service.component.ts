import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  SettingsServiceBusiness,
  SettingsServiceBusinesses,
} from './settings-service.business';
import {
  SettingServiceType,
  SettingsServiceWindow,
} from './settings-service.model';

@Component({
  selector: 'howell-settings-service',
  templateUrl: './settings-service.component.html',
  styleUrls: ['../confirm.less', './settings-service.component.less'],
  providers: [...SettingsServiceBusinesses],
})
export class SettingsServiceComponent implements OnInit {
  constructor(
    private business: SettingsServiceBusiness,
    private toastr: ToastrService
  ) {}

  srId?: string;
  passengerId?: string;
  analysisId?: string;
  window = new SettingsServiceWindow();
  Type = SettingServiceType;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.business.sr.get().then((array) => {
      if (array && array.length > 0) {
        this.srId = array[0].Id;
      }
    });

    this.business.passenger.get().then((array) => {
      if (array && array.length > 0) {
        this.passengerId = array[0].Id;
      }
    });
    this.business.analysis.get().then((array) => {
      if (array && array.length > 0) {
        this.analysisId = array[0].Id;
      }
    });
  }

  syncSRServer() {
    if (this.srId) {
      this.business.sr
        .sync(this.srId)
        .then((x) => {
          this.toastr.success('同步成功');
        })
        .catch((x) => {
          this.toastr.error('同步失败');
        });
    }
  }
  syncPassengerServer() {
    if (this.passengerId) {
      this.business.passenger
        .sync(this.passengerId)
        .then((x) => {
          this.toastr.success('同步成功');
        })
        .catch((x) => {
          this.toastr.error('同步失败');
        });
    }
  }
  syncCenterID() {
    this.business.hall
      .sync()
      .then((x) => {
        this.toastr.success('同步成功');
      })
      .catch((x) => {
        this.toastr.error('同步失败');
      });
  }

  syncAnalysisServer() {
    if (this.analysisId) {
      this.business.analysis
        .sync(this.analysisId)
        .then((x) => {
          this.toastr.success('同步成功');
        })
        .catch((x) => {
          this.toastr.error('同步失败');
        });
    }
  }

  onconfirm(type: SettingServiceType) {
    this.window.confirm.message = this.getMessage(type);
    this.window.confirm.type = type;
    this.window.confirm.show = true;
  }

  getMessage(type: SettingServiceType) {
    switch (type) {
      case SettingServiceType.sr_server:
        return '是否同步流转服务器?';
      case SettingServiceType.passenger_server:
        return '是否同步客流服务器?';
      case SettingServiceType.center_id:
        return '是否同步中心ID?';
      case SettingServiceType.analysis_server:
        return '是否同步分析服务器?';

      default:
        return '';
    }
  }

  onyes() {
    switch (this.window.confirm.type) {
      case SettingServiceType.sr_server:
        this.syncSRServer();
        break;
      case SettingServiceType.passenger_server:
        this.syncPassengerServer();
        break;
      case SettingServiceType.center_id:
        this.syncCenterID();
        break;
      case SettingServiceType.analysis_server:
        this.syncAnalysisServer();
        break;
      default:
        break;
    }
    this.window.confirm.show = false;
  }

  onsubtitle() {
    this.window.subtitle.show = true;
  }
}

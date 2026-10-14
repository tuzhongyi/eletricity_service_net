import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SRServerAddress } from 'src/app/models/sr-service-address.model';
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
    private toastr: ToastrService,
  ) {}

  window = new SettingsServiceWindow();
  Type = SettingServiceType;
  addressadd = new EventEmitter<SRServerAddress>();

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.passenger.load();
    this.analysis.load();
  }

  passenger = {
    id: '',
    load: () => {
      this.business.passenger.get().then((array) => {
        if (array && array.length > 0) {
          this.passenger.id = array[0].Id;
        }
      });
    },
    sync: () => {
      if (this.passenger.id) {
        this.business.passenger
          .sync(this.passenger.id)
          .then((x) => {
            this.toastr.success('同步成功');
          })
          .catch((x) => {
            this.toastr.error('同步失败');
          });
      }
    },
  };
  analysis = {
    id: '',
    load: () => {
      this.business.analysis.get().then((array) => {
        if (array && array.length > 0) {
          this.analysis.id = array[0].Id;
        }
      });
    },
    sync: () => {
      if (this.analysis.id) {
        this.business.analysis
          .sync(this.analysis.id)
          .then((x) => {
            this.toastr.success('同步成功');
          })
          .catch((x) => {
            this.toastr.error('同步失败');
          });
      }
    },
  };
  center = {
    sync: () => {
      this.business.hall
        .sync()
        .then((x) => {
          this.toastr.success('同步成功');
        })
        .catch((x) => {
          this.toastr.error('同步失败');
        });
    },
  };

  confirm = {
    yes: new EventEmitter<void>(),
    open: (type: SettingServiceType) => {
      this.window.confirm.message = this.confirm.message(type);
      this.window.confirm.type = type;
      this.window.confirm.show = true;
    },
    message: (type: SettingServiceType) => {
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
    },
    on: {
      yes: () => {
        this.confirm.yes.emit();
        switch (this.window.confirm.type) {
          case SettingServiceType.sr_server:
          case SettingServiceType.passenger_server:
            break;
          case SettingServiceType.center_id:
            this.center.sync();
            break;
          case SettingServiceType.analysis_server:
            this.analysis.sync();
            break;
          default:
            break;
        }
        this.window.confirm.show = false;
      },
    },
  };

  on = {
    sync: {},
    subtitle: () => {
      this.window.subtitle.show = true;
    },
    passenger: () => {
      this.window.passenger.show = true;
    },
    sr: {
      manager: {
        open: () => {
          this.window.sr.manager.show = true;
        },
      },
      address: {
        open: () => {
          this.window.sr.address.show = true;
        },
        ok: (data: SRServerAddress) => {
          this.addressadd.emit(data);
          this.window.sr.address.show = false;
        },
      },
    },
  };
}

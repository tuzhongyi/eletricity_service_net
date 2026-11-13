import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AudioSourceType } from 'src/app/enums/audio-source-type.enum';
import { AudioSource } from 'src/app/models/audio-source.model';
import { SRServerAddress } from 'src/app/models/sr-service-address.model';
import { AnalysisServerRequestService } from 'src/app/network/request/analysis/analysis-request.service';
import { SettingsServiceAnalysisServerBusiness } from '../settings-service-analysis-server/business/settings-service-analysis-server.business';
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
  providers: [
    ...SettingsServiceBusinesses,
    SettingsServiceAnalysisServerBusiness,
  ],
})
export class SettingsServiceComponent implements OnInit {
  constructor(
    private business: SettingsServiceBusiness,
    private toastr: ToastrService,
    private request: AnalysisServerRequestService,
    private analysisServer: SettingsServiceAnalysisServerBusiness,
  ) {}

  window = new SettingsServiceWindow();
  Type = SettingServiceType;
  addressadd = new EventEmitter<SRServerAddress>();

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.passenger.load();
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
      this.window.confirm.data = undefined;
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
        switch (this.window.confirm.type) {
          case SettingServiceType.sr_server:
          case SettingServiceType.passenger_server:
          case SettingServiceType.analysis_server:
            this.confirm.yes.emit();
            break;
          case SettingServiceType.center_id:
            this.center.sync();
            break;
          case SettingServiceType.audio_source:
            this.audio.delete();
            break;
          default:
            break;
        }
        this.window.confirm.show = false;
      },
    },
  };

  audio = {
    data: new AudioSource(),
    check: new EventEmitter<(checked: boolean) => void>(),
    reload: new EventEmitter<void>(),
    open: (data: AudioSource) => {
      this.audio.data = Object.assign(new AudioSource(), data);
      this.window.audio.title = data.Id ? '编辑音频源' : '添加音频源';
      this.window.audio.show = true;
    },
    add: (serverId: string) => {
      if (!serverId) {
        this.toastr.warning('请先同步分析服务器');
        return;
      }
      const data = new AudioSource();
      data.AnalysisServerId = serverId;
      data.SourceType = AudioSourceType.Camera;
      data.Emotions = [];
      data.Keywords = [];
      data.DefaultIsAlarm = false;
      this.audio.open(data);
    },
    save: () => {
      const data = this.audio.data;
      const serverId = data.AnalysisServerId ?? '';
      const save = data.Id
        ? this.analysisServer.audio.update(serverId, data)
        : this.analysisServer.audio.create(serverId, data);
      save
        .then(() => {
          this.toastr.success('操作成功');
          this.window.audio.show = false;
          this.audio.reload.emit();
        })
        .catch(() => {
          this.toastr.error('操作失败');
        });
    },
    remove: (data: AudioSource) => {
      this.window.confirm.data = data;
      this.window.confirm.type = SettingServiceType.audio_source;
      this.window.confirm.message = `是否删除音频源 ${data.Name} ?`;
      this.window.confirm.show = true;
    },
    delete: () => {
      const data = this.window.confirm.data;
      if (!data) return;
      this.request.audio
        .delete(data.AnalysisServerId ?? '', data.Id)
        .then(() => {
          this.toastr.success('删除成功');
          this.audio.reload.emit();
        })
        .catch(() => {
          this.toastr.error('删除失败');
        });
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
    analysis: {
      open: () => {
        this.window.analysis.show = true;
      },
    },
    audio: {
      ok: () => {
        this.audio.check.emit((checked) => {
          if (!checked) return;
          this.audio.save();
        });
      },
      cancel: () => {
        this.window.audio.show = false;
      },
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

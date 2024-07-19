import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';
import { SettingsSubtitleChannelTableOptions } from '../../tables/settings-subtitle-channel-table/settings-subtitle-channel-table.model';
import { SettingsSubtitleChannelManagerBusiness } from './settings-subtitle-channel-manager.business';
import { SettingsSubtitleChannelManagerWindow } from './settings-subtitle-channel-manager.model';

@Component({
  selector: 'howell-settings-subtitle-channel-manager',
  templateUrl: './settings-subtitle-channel-manager.component.html',
  styleUrls: [
    '../confirm.less',
    './settings-subtitle-channel-manager.component.less',
  ],
  providers: [SettingsSubtitleChannelManagerBusiness],
})
export class SettingsSubtitleChannelManagerComponent implements OnInit {
  constructor(
    private business: SettingsSubtitleChannelManagerBusiness,
    private toastr: ToastrService
  ) {}

  opts = new SettingsSubtitleChannelTableOptions();
  load = new EventEmitter<SettingsSubtitleChannelTableOptions>();
  window = new SettingsSubtitleChannelManagerWindow();

  servers: SubtitlingServer[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadServer();
  }

  loadServer() {
    this.business.server().then((x) => {
      this.servers = x;
      if (this.servers && this.servers.length > 0) {
        this.opts.serverId = this.servers[0].Id;
      }
    });
  }

  onsearch() {
    this.load.emit(this.opts);
  }

  onsupported() {
    this.window.supported.show = true;
  }

  onremove(item: SubtitlingChannel) {
    this.window.confirm.message = '是否删除该通道？';
    this.window.confirm.yes = new Promise((resolve, reject) => {
      this.business
        .remove(item.ServerId, item.Id)
        .then((x) => {
          resolve();
        })
        .catch((x) => {
          reject(x);
        });
    });
    this.window.confirm.show = true;
  }
  onenablechange(item: SubtitlingChannel) {
    item.Enabled = !item.Enabled;
    this.business
      .update(item)
      .then((x) => {
        this.load.emit(this.opts);
        this.toastr.success('操作成功');
      })
      .catch((x) => {
        this.toastr.error('操作失败');
      });
  }

  onsyncfrombusiness() {
    if (!this.opts.serverId) {
      this.toastr.error('请先选择一个字幕服务器');
      return;
    }
    this.window.confirm.message = '是否同步本地业务摄像机到字幕服务器？';

    this.window.confirm.yes = new Promise((resolve, reject) => {
      this.business.sync.from
        .business(this.opts.serverId!)
        .then((x) => {
          resolve();
        })
        .catch((x) => {
          reject(x);
        });
    });
    this.window.confirm.show = true;
  }

  onsynctoserver() {
    if (!this.opts.serverId) {
      this.toastr.error('请先选择一个字幕服务器');
      return;
    }
    this.window.confirm.message =
      '是否把本地的字幕服务器通道同步到实际的字幕服务器上？';

    this.window.confirm.yes = new Promise((resolve, reject) => {
      this.business.sync.from
        .business(this.opts.serverId!)
        .then((x) => {
          resolve();
        })
        .catch((x) => {
          reject(x);
        });
    });
    this.window.confirm.show = true;
  }

  onconfirmyes() {
    this.window.confirm.yes
      .then((x) => {
        this.load.emit(this.opts);
        this.window.confirm.show = false;
        this.toastr.success('操作成功');
      })
      .catch((x) => {
        this.toastr.error('操作失败');
      });
  }

  onsupportedclose(reload: boolean) {
    if (reload) {
      this.load.emit(this.opts);
    }
    this.window.supported.show = false;
  }

  onschedule(item: SubtitlingChannel) {
    this.window.schedule.channel = item;
    this.window.schedule.show = true;
  }
  onscheduleclose(result: boolean) {
    if (result) {
      this.toastr.success('操作成功');
      this.load.emit(this.opts);
    }
    this.window.schedule.show = false;
  }
}

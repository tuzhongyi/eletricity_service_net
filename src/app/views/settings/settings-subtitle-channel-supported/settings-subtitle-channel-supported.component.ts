import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SettingsSubtitleChannelSupportedTableOptions } from '../../tables/settings-subtitle-channel-supported-table/settings-subtitle-channel-supported-table.model';
import { SettingsSubtitleChannelSupportedBusiness } from './settings-subtitle-channel-supported.business';

@Component({
  selector: 'howell-settings-subtitle-channel-supported',
  templateUrl: './settings-subtitle-channel-supported.component.html',
  styleUrls: ['./settings-subtitle-channel-supported.component.less'],
  providers: [SettingsSubtitleChannelSupportedBusiness],
})
export class SettingsSubtitleChannelSupportedComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private business: SettingsSubtitleChannelSupportedBusiness,
    private toastr: ToastrService
  ) {}

  opts = new SettingsSubtitleChannelSupportedTableOptions();
  load = new EventEmitter<SettingsSubtitleChannelSupportedTableOptions>();

  selecteds = [];

  ngOnInit(): void {}

  onsearch() {
    this.load.emit(this.opts);
  }

  onok() {
    if (this.selecteds.length > 0) {
      this.business
        .set(this.selecteds)
        .then((x) => {
          this.toastr.success('操作成功');
          this.close.emit(true);
        })
        .catch((x) => {
          this.toastr.error(x.message);
        });
    } else {
      this.toastr.warning('请选择需要添加的通道');
    }
  }

  oncancel() {
    this.close.emit(false);
  }
}

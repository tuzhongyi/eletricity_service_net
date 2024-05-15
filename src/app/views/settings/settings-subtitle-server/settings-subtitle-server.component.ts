import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';
import { SettingsSubtitleServerBusiness } from './settings-subtitle-server.business';

@Component({
  selector: 'howell-settings-subtitle-server',
  templateUrl: './settings-subtitle-server.component.html',
  styleUrls: ['./settings-subtitle-server.component.less'],
  providers: [SettingsSubtitleServerBusiness],
})
export class SettingsSubtitleServerComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor(
    private business: SettingsSubtitleServerBusiness,
    private toastr: ToastrService
  ) {}

  model = new SubtitlingServer();

  ngOnInit(): void {
    this.business.get().then((x) => {
      if (x) {
        this.model = x;
      }
    });
  }

  async onok() {
    if (this.check()) {
      let promise: Promise<SubtitlingServer>;
      if (this.model.Id) {
        promise = this.business.update(this.model);
      } else {
        promise = this.business.create(this.model);
      }

      promise
        .then((x) => {
          this.toastr.success('操作成功');
          this.close.emit();
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        });
    }
  }

  oncancel() {
    this.close.emit();
  }

  check() {
    if (this.model) {
      if (!this.model.Name) {
        this.toastr.warning('请输入服务器名称');
        return false;
      }
      if (!this.model.Host) {
        this.toastr.warning('请输入主机地址');
        return false;
      }
      if (!this.model.Port) {
        this.toastr.warning('请输入端口号');
        return false;
      }
    }
    return true;
  }
}

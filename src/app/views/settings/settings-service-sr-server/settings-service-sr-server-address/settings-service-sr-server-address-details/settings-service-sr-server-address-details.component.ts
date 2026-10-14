import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SRServerAddress } from 'src/app/models/sr-service-address.model';

@Component({
  selector: 'howell-settings-service-sr-server-address-details',
  templateUrl: './settings-service-sr-server-address-details.component.html',
  styleUrls: ['./settings-service-sr-server-address-details.component.less'],
})
export class SettingsServiceSrServerAddressDetailsComponent implements OnInit {
  @Output() ok = new EventEmitter<SRServerAddress>();
  @Output() close = new EventEmitter<void>();

  constructor(private toastr: ToastrService) {}

  data = this.init();
  ngOnInit(): void {}

  private init() {
    let data = new SRServerAddress();
    data.IsDefault = true;
    data.IsInternet = false;
    return data;
  }

  private get check() {
    if (!this.data.IPAddress) {
      this.toastr.warning('请填写主机地址');
      return false;
    }
    if (!this.data.Port) {
      this.toastr.warning('请填写主机端口号');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        this.ok.emit(this.data);
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };
}

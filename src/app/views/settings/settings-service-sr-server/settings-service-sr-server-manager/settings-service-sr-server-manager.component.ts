import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SRServer } from 'src/app/models/sr-server.model';
import { SRServerAddress } from 'src/app/models/sr-service-address.model';
import { SettingsServiceSRServerBusiness } from '../business/settings-service-sr-server.business';

@Component({
  selector: 'howell-settings-service-sr-server-manager',
  templateUrl: './settings-service-sr-server-manager.component.html',
  styleUrls: ['./settings-service-sr-server-manager.component.less'],
  providers: [SettingsServiceSRServerBusiness],
})
export class SettingsServiceSrServerManagerComponent
  implements OnInit, OnDestroy
{
  @Input('sync') input_sync?: EventEmitter<void>;

  @Input() addressadd?: EventEmitter<SRServerAddress>;
  @Output() addressopen = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SettingsServiceSRServerBusiness,
    private toastr: ToastrService,
  ) {}
  private init = {
    server: () => {
      let data = new SRServer();
      data.Id = '';
      data.ProtocolType = 'Howell';
      data.Addresses = [this.init.address()];

      return data;
    },
    address: () => {
      let address = new SRServerAddress();
      address.IsInternet = false;
      address.IsDefault = true;
      return address;
    },
  };
  model: SRServer = this.init.server();
  private subs = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private regist() {
    if (this.addressadd) {
      this.subs.add(
        this.addressadd.subscribe((x) => {
          this.model.Addresses = [...(this.model.Addresses ?? []), x];
        }),
      );
    }
    if (this.input_sync) {
      this.subs.add(
        this.input_sync.subscribe((x) => {
          this.sync();
        }),
      );
    }
  }
  private load() {
    return this.business
      .get()
      .then((x) => {
        if (x) {
          this.model = x;
          if (!this.model.Addresses || this.model.Addresses.length == 0) {
            this.model.Addresses = [this.init.address()];
          }
        }
        return x;
      })
      .catch((x) => {
        return undefined;
      });
  }

  private sync() {
    this.load().then((data) => {
      if (data) {
        this.business
          .sync(data.Id)
          .then((x) => {
            this.toastr.success('同步成功');

            this.load();
          })
          .catch(() => {
            this.toastr.error('同步失败');
          });
      } else {
        this.toastr.error('未找到服务器');
      }
    });
  }
  private get check() {
    if (!this.model.Name) {
      this.toastr.warning('请输入服务器名称');
      return false;
    }
    if (this.model.Addresses.length == 0) {
      this.toastr.warning('请添加服务器地址');
      return false;
    }
    if (!this.model.Addresses[0].IPAddress) {
      this.toastr.warning('请填写主机地址');
      return false;
    }
    if (!this.model.Addresses[0].Port) {
      this.toastr.warning('请填写主机端口号');
      return false;
    }
    this.model.Addresses[0].IsInternet = !!this.model.Addresses[0].IsInternet;
    this.model.Addresses[0].IsDefault = !!this.model.Addresses[0].IsDefault;

    return true;
  }

  address = {
    data: undefined as SRServerAddress | undefined,
    on: {
      add: () => {
        this.addressopen.emit();
      },
      remove: (item: SRServerAddress) => {
        this.model.Addresses = (this.model.Addresses ?? []).filter(
          (x) => x !== item,
        );
      },
    },
  };

  on = {
    sync: () => {
      this.confirm.emit();
    },
    ok: () => {
      if (this.check) {
        let promise: Promise<SRServer>;
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
          .catch((e) => {
            this.toastr.error('操作失败');
          });
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };
}

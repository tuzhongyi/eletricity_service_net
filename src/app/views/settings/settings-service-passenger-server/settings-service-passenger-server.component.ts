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
import { ProtocolType } from 'src/app/enums/protocol-type.enum';
import { PassengerServer } from 'src/app/models/passenger-server.model';
import { EnumTool } from 'src/app/tools/enum-tool/enum.tool';
import { Language } from 'src/app/tools/language';
import { SettingsServicePassengerServerBusiness } from './settings-service-passenger-server.business';

@Component({
  selector: 'howell-settings-service-passenger-server',
  templateUrl: './settings-service-passenger-server.component.html',
  styleUrls: ['./settings-service-passenger-server.component.less'],
  providers: [SettingsServicePassengerServerBusiness],
})
export class SettingsServicePassengerServerComponent
  implements OnInit, OnDestroy
{
  @Input('sync') input_sync?: EventEmitter<void>;

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SettingsServicePassengerServerBusiness,
    private toastr: ToastrService,
  ) {}

  model = this.init();
  private subs = new Subscription();
  Protocol = ProtocolType;
  source = {
    protocol: new Map<ProtocolType, string>(),
  };

  language = {
    status: '未知',
  };

  ngOnInit(): void {
    this.regist();
    this.load();
    let values = EnumTool.values(ProtocolType);
    this.source.protocol = new Map(
      values.map((x) => {
        return [x, ProtocolType[x]];
      }),
    );
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  private init() {
    let data = new PassengerServer();
    data.Id = '';
    data.Interval = 300;
    data.ProtocolType = ProtocolType.Keliuyun;

    return data;
  }
  private regist() {
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
        }
        return x;
      })
      .catch((x) => {
        return undefined;
      })
      .finally(() => {
        this.language.status = Language.DeviceStatus(this.model.Status);
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
    if (this.model) {
      if (!this.model.Name) {
        this.toastr.warning('请输入服务器地址');
        return false;
      }
      if (!this.model.Url) {
        this.toastr.warning('请输入Url地址');
        return false;
      }
      if (!this.model.ProtocolType) {
        this.toastr.warning('请选择协议类型');
        return false;
      }
      if (this.model.Interval == undefined || this.model.Interval < 0) {
        this.toastr.warning('请输入数据刷新间隔');
        return false;
      }
    }
    return true;
  }

  on = {
    sync: () => {
      this.confirm.emit();
    },
    ok: () => {
      if (this.check) {
        let promise: Promise<PassengerServer>;
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

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
import { AnalysisServer } from 'src/app/models/analysis-server.model';
import { AudioSource } from 'src/app/models/audio-source.model';
import { SettingsServiceAnalysisServerBusiness } from '../business/settings-service-analysis-server.business';

@Component({
  selector: 'howell-settings-service-analysis-server-manager',
  templateUrl: './settings-service-analysis-server-manager.component.html',
  styleUrls: ['./settings-service-analysis-server-manager.component.less'],
  providers: [SettingsServiceAnalysisServerBusiness],
})
export class SettingsServiceAnalysisServerManagerComponent
  implements OnInit, OnDestroy
{
  @Input('sync') input_sync?: EventEmitter<void>;
  /** 音频源增删改后由父组件 emit 一下刷新列表 */
  @Input('reload') input_reload?: EventEmitter<void>;

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<string>();
  @Output() edit = new EventEmitter<AudioSource>();
  @Output() remove = new EventEmitter<AudioSource>();

  constructor(
    private business: SettingsServiceAnalysisServerBusiness,
    private toastr: ToastrService,
  ) {}

  private init = {
    server: () => {
      let data = new AnalysisServer();
      data.Id = '';
      data.ProtocolType = 'Howell';
      data.Interval = 300;
      return data;
    },
  };
  model: AnalysisServer = this.init.server();
  private subs = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private regist() {
    if (this.input_sync) {
      this.subs.add(
        this.input_sync.subscribe(() => {
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
      .catch(() => {
        return undefined;
      });
  }
  private sync() {
    this.load().then((data) => {
      if (data) {
        this.business
          .sync(data.Id)
          .then(() => {
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
    return true;
  }

  on = {
    sync: () => {
      this.confirm.emit();
    },
    ok: () => {
      if (!this.check) return;
      const promise = this.model.Id
        ? this.business.update(this.model)
        : this.business.create(this.model);
      promise
        .then(() => {
          this.toastr.success('操作成功');
          this.close.emit();
        })
        .catch(() => {
          this.toastr.error('操作失败');
        });
    },
    cancel: () => {
      this.close.emit();
    },
    add: () => {
      this.add.emit(this.model.Id);
    },
    edit: (item: AudioSource) => {
      this.edit.emit(item);
    },
    remove: (item: AudioSource) => {
      this.remove.emit(item);
    },
  };
}

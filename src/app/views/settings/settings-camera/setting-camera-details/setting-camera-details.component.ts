import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { Camera } from 'src/app/models/camera.model';
import { Resolution } from 'src/app/models/resolution.model';
import { Language } from 'src/app/tools/language';
import { SettingCameraBusiness } from '../business/setting-camera.business';
import { SettingCameraSource } from '../business/setting-camera.source';

@Component({
  selector: 'howell-setting-camera-details',
  templateUrl: './setting-camera-details.component.html',
  styleUrls: ['./setting-camera-details.component.less'],
  providers: [SettingCameraBusiness, SettingCameraSource],
})
export class SettingCameraDetailsComponent implements OnInit {
  @Input() data?: Camera;
  @Output() ok: EventEmitter<Camera> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor(
    public source: SettingCameraSource,
    private business: SettingCameraBusiness,

    private toastr: ToastrService,
  ) {}

  model = this.init();
  Language = Language;

  ngOnInit(): void {
    if (this.data) {
      this.model = Object.assign(this.model, this.data);
    }
    this.resolution.load();
    // this.regist();
  }

  private init() {
    let camera = new Camera();
    camera.Usage = CameraUsage.Monitor;
    camera.Resolution = new Resolution();
    camera.Resolution.Width = 1920;
    camera.Resolution.Height = 1080;
    return camera;
  }

  private regist() {
    this.source.loaded.sr = () => {
      if (!this.model.Id) {
        if (this.source.server.sr.length == 1) {
          this.model.SRServerId = this.source.server.sr[0].Id;
        }
      }
    };
    this.source.loaded.passenger = () => {
      if (!this.model.Id) {
        if (this.source.server.passenger.length == 1) {
          this.model.PassengerServerUnid = this.source.server.passenger[0].Id;
        }
      }
    };
    this.source.loaded.audio = () => {
      if (this.source.server.analysis.audio.source.length == 1) {
        this.model.AudioSourceId =
          this.source.server.analysis.audio.source[0].Id;
      }
    };
  }

  private get check() {
    if (!this.model.Name) {
      this.toastr.warning('请填写摄像机名称');
      return false;
    }

    if (this.model.Usage == undefined) {
      this.toastr.warning('请选择用途');
      return false;
    }
    return true;
  }

  resolution = {
    selected: undefined as Resolution | undefined,
    is: (a?: Resolution, b?: Resolution) => {
      if (!a || !b) return false;
      return a.Width == b.Width && a.Height == b.Height;
    },
    load: () => {
      if (this.model.Resolution) {
        this.resolution.selected = this.source.resolutions
          .map((x) => x.value)
          .find((x) => this.resolution.is(this.model.Resolution, x));
      }
    },
    change: () => {
      this.model.Resolution = this.resolution.selected;
    },
  };

  on = {
    ok: () => {
      if (this.check) {
        let promise: Promise<Camera>;
        if (this.model.Id) {
          promise = this.business.update(this.model);
        } else {
          promise = this.business.create(this.model);
        }
        promise
          .then((x) => {
            this.toastr.success('操作成功');
            this.ok.emit(this.model);
            this.close.emit();
          })
          .catch((x) => {
            console.error(x);
            this.toastr.error('操作失败');
          });
      }
    },
    cancel: () => {
      this.close.emit();
    },
  };
}

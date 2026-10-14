import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { Camera } from 'src/app/models/camera.model';
import { Language } from 'src/app/tools/language';
import { SettingCameraBusiness } from '../business/setting-camera.business';
import { SettingCameraSource } from '../business/setting-camera.source';
import {
  CameraModel,
  CameraTableArgs,
} from '../setting-camera-table/setting-camera-table.model';
import { CameraManagerWindow } from './setting-camera-manager.model';

@Component({
  selector: 'howell-setting-camera-manager',
  templateUrl: './setting-camera-manager.component.html',
  styleUrls: ['../../confirm.less', './setting-camera-manager.component.less'],
  providers: [SettingCameraBusiness, SettingCameraSource],
})
export class SettingCameraManagerComponent implements OnInit {
  constructor(
    private business: SettingCameraBusiness,
    private toastr: ToastrService,
    public source: SettingCameraSource,
  ) {}

  Status = DeviceStatus;
  Language = Language;
  window = new CameraManagerWindow();
  ngOnInit(): void {}

  table = {
    args: new CameraTableArgs(),
    load: new EventEmitter<CameraTableArgs>(),
    selecteds: [] as CameraModel[],
    to: {
      load: (first: boolean) => {
        this.table.args.first = first;
        this.table.load.emit(this.table.args);
      },
    },
    on: {
      selecteds: (data: CameraModel[]) => {
        this.table.selecteds = data;
      },
      preview: (data: Camera) => {
        this.window.video.title = data.Name;
        this.window.video.cameraId = data.Id;
        this.window.video.show = true;
      },
      remove: (data: Camera) => {
        this.manager.confirm.open(data);
      },
      details: (data: Camera) => {
        this.window.clear();
        this.window.details.data = data;
        this.window.details.show = true;
      },
    },
  };

  manager = {
    on: {
      search: () => {
        this.table.to.load(true);
      },
      create: () => {
        this.window.clear();
        this.window.details.show = true;
      },
      removes: () => {
        if (this.table.selecteds.length === 0) return;
        this.manager.confirm.openAll(this.table.selecteds);
      },
    },
    confirm: {
      open: (data: Camera) => {
        this.window.clear();
        this.window.confirm.data = data;
        this.window.confirm.show = true;
      },
      /** 表格里勾了一条或多条，攒着一起删 */
      openAll: (data: CameraModel[]) => {
        this.window.clear();
        this.window.confirm.selecteds = data;
        this.window.confirm.show = true;
      },
      ok: () => {
        let confirm = this.window.confirm;
        // 单个删除走 data，批量删除走 selecteds；接口没有批量方法，逐个删
        let ids = confirm.data
          ? [confirm.data.Id]
          : confirm.selecteds.map((x) => x.Id);
        if (ids.length === 0) {
          confirm.show = false;
          return;
        }
        Promise.all(ids.map((id) => this.business.remove(id)))
          .then((x) => {
            this.toastr.success('删除成功');
            this.table.to.load(false);
          })
          .catch((x) => {
            this.toastr.error('删除失败');
          })
          .finally(() => {
            this.window.confirm.show = false;
          });
      },
      close: () => {
        this.window.confirm.show = false;
      },
    },
  };
}

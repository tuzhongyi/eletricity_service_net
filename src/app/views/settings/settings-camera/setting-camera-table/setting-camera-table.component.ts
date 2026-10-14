import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { Camera } from 'src/app/models/camera.model';
import { PagedTableAbstractComponent } from 'src/app/views/tables/table-abstract.component';
import { SettingCameraBusiness } from '../business/setting-camera.business';
import { CameraModel, CameraTableArgs } from './setting-camera-table.model';

@Component({
  selector: 'howell-setting-camera-table',
  templateUrl: './setting-camera-table.component.html',
  styleUrls: [
    '../../../tables/table-list.less',
    './setting-camera-table.component.less',
  ],
  providers: [SettingCameraBusiness],
})
export class SettingCameraTableComponent
  extends PagedTableAbstractComponent<CameraModel>
  implements OnInit
{
  @Input() args: CameraTableArgs = new CameraTableArgs();
  @Input() load?: EventEmitter<CameraTableArgs>;
  @Input() selecteds: CameraModel[] = [];
  @Output() details: EventEmitter<Camera> = new EventEmitter();
  @Output() remove: EventEmitter<Camera> = new EventEmitter();
  @Output() preview = new EventEmitter<Camera>();
  @Output() selectedsChange: EventEmitter<CameraModel[]> = new EventEmitter();
  constructor(private business: SettingCameraBusiness) {
    super();
  }

  /** 基类是 9，这里跟分页器/请求统一成 10 */
  override pageSize = 10;

  widths = ['64px', 'auto', '8%', '12%', '10%', '10%', '10%', '10%', '10%'];

  ngOnInit(): void {
    this.regist();
    this.loadData(1);
  }

  private regist() {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        // first=true 说明查询条件变了，回第一页；否则留在当前页
        // （这里是 PageIndex 不是 PageSize，之前写成 PageSize 会去请求第 10 页，表就空了）
        let index = x.first ? 1 : (this.page.PageIndex ?? 1);
        this.loadData(index);
      });
    }
  }

  /** args 必须有默认值：基类 pageEvent 是按 loadData(index, size) 两个参数调的 */
  loadData(
    index: number,
    size = this.pageSize,
    args: CameraTableArgs = this.args,
  ) {
    this.business.load(index, size, args).then((paged) => {
      this.datas = paged.Data;
      this.page = paged.Page;
      // 换页/查询/删除后重新加载，选中状态跟着清掉
      this.selecteds = [];
      this.selectedsChange.emit(this.selecteds);
    });
  }

  /** 表头全选框的状态：有数据且全被选中 */
  get all() {
    return this.datas.length > 0 && this.selecteds.length === this.datas.length;
  }

  on = {
    check: (item: CameraModel) => {
      let index = this.selecteds.findIndex((x) => x.Id === item.Id);
      if (index < 0) {
        this.selecteds.push(item);
      } else {
        this.selecteds.splice(index, 1);
      }
      this.selectedsChange.emit(this.selecteds);
    },
    all: (e: MatCheckboxChange) => {
      this.selecteds = e.checked ? [...this.datas] : [];
      this.selectedsChange.emit(this.selecteds);
    },
    details: (item: Camera, e: Event) => {
      // 图标在行里，不拦的话点图标会把这一行也选中/取消
      e.stopImmediatePropagation();

      this.selecteds = [item];
      this.selectedsChange.emit(this.selecteds);

      this.details.emit(item);
    },
    remove: (item: Camera, e: Event) => {
      e.stopImmediatePropagation();

      this.selecteds = [item];
      this.selectedsChange.emit(this.selecteds);
      this.remove.emit(item);
    },
    preview: (item: Camera, e: Event) => {
      e.stopImmediatePropagation();

      this.selecteds = [item];
      this.selectedsChange.emit(this.selecteds);
      this.preview.emit(item);
    },
    page: (page: PageEvent) => {
      let index = page.pageIndex + 1;
      this.loadData(index, page.pageSize, this.args);
    },
  };
}

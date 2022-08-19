import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonFlatNode } from 'src/app/components/common-tree/common-tree.model';
import { OperationType } from 'src/app/enums/operation-type.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { CameraZone } from 'src/app/models/camera-zone.model';
import { Camera } from 'src/app/models/camera.model';
import { IModel } from 'src/app/models/model.interface';
import { Point } from 'src/app/models/point.model';
import { Polygon } from 'src/app/models/polygon.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { ConfirmWindow } from './business/confirm-window.business';
import { SettingsCameraZoneListBusiness } from './business/settings-camera-zone-list.business';
import { SettingsCameraZoneBusiness } from './settings-camera-zone.business';
import { SettingsCameraZoneModel } from './settings-camera-zone.model';

@Component({
  selector: 'howell-settings-camera-zone',
  templateUrl: './settings-camera-zone.component.html',
  styleUrls: ['./settings-camera-zone.component.less'],
  providers: [SettingsCameraZoneBusiness, SettingsCameraZoneListBusiness],
})
export class SettingsCameraZoneComponent
  implements IComponent<IModel, SettingsCameraZoneModel>, OnInit
{
  constructor(business: SettingsCameraZoneBusiness) {
    this.business = business;
  }
  business: SettingsCameraZoneBusiness;
  model?: SettingsCameraZoneModel;
  window = new ConfirmWindow();
  zoneName: string = '';
  polygon?: Polygon;
  clear: EventEmitter<void> = new EventEmitter();
  loadTree: EventEmitter<string> = new EventEmitter();
  loadCanvas: EventEmitter<Polygon> = new EventEmitter();

  ngOnInit(): void {}

  async selectTreeNode(nodes: CommonFlatNode[]) {
    if (nodes && nodes.length > 0) {
      let node = nodes[0];
      if (node.RawData instanceof Camera) {
        let camera = node.RawData;
        this.model = await this.business.load(camera);
      }
    }
  }
  onCanvasLoaded() {
    if (this.model && this.model.zone) {
      this.loadCanvas.emit(this.model.zone.Area);
    }
  }

  async capturePicture() {
    if (this.model) {
      let url = await this.business.capturePicture(this.model.cameraId);
      this.model.image.url = url;
    }
  }
  @ViewChild('file')
  file?: ElementRef;
  onupload() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  fileChange() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.uploadFile(t_files[0]);
        this.file.nativeElement.value = null;
      }
    }
  }
  async uploadFile(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('loadend', async () => {
      if (this.model) {
        let pic = reader.result as string;
        let index = pic.indexOf('base64');
        pic = pic.slice(index + 7);
        this.model.camera = await this.business.picture(
          this.model.cameraId,
          pic
        );
        this.model = await this.business.load(this.model.camera);
        if (this.model && this.model.zone) {
          this.loadCanvas.emit(this.model.zone.Area);
        }
      }
    });
  }

  onDrowFinished(polygon: Polygon) {
    this.window.show = true;
    this.polygon = polygon;
  }

  async removeZone() {
    if (this.model && this.model.zone) {
      this.model.zones = await this.business.zone.remove(this.model.zone);
      this.model.zone = undefined;
      if (this.model.zones && this.model.zones.length > 0) {
        this.model.zone = this.model.zones[0].value;
      }

      this.clear.emit();
      this.loadTree.emit();
      if (this.model && this.model.zone) {
        this.loadCanvas.emit(this.model.zone.Area);
      }
    }
  }
  updateZone() {
    this.clear.emit();
    this.loadTree.emit();
  }

  async confirmYes() {
    this.window.show = false;
    if (this.model && this.polygon) {
      this.model.zones = await this.business.zone.create(
        this.model.camera,
        this.zoneName,
        this.polygon
      );
      this.model.zone = undefined;
      if (this.model.zones && this.model.zones.length > 0) {
        this.model.zone = this.model.zones[0].value;
      }
      this.loadTree.emit();
    }
  }
  confirmNo() {
    this.window.show = false;
  }
}

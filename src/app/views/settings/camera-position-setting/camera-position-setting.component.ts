import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  IPoint,
  MapChartPoint,
} from 'src/app/components/charts/map-chart/map-chart.model';
import { CommonFlatNode } from 'src/app/components/common-tree/common-tree.model';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';
import { IModel } from 'src/app/models/model.interface';
import { Position } from 'src/app/models/position.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { CameraPositionSettingBusiness } from './camera-position-setting.business';

@Component({
  selector: 'howell-camera-position-setting',
  templateUrl: './camera-position-setting.component.html',
  styleUrls: ['./camera-position-setting.component.less'],
  providers: [CameraPositionSettingBusiness],
})
export class CameraPositionSettingComponent
  implements IComponent<IModel[], IPoint[]>, OnInit
{
  constructor(public business: CameraPositionSettingBusiness) {
    this.business = business;
  }

  floor?: Floor;
  url: string = '';
  upload: EventEmitter<void> = new EventEmitter();
  camera?: Camera;
  points: IPoint[] = [];
  filter: string[] = [];
  loadSource: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {}

  async selectTreeNode(nodes: CommonFlatNode[]) {
    if (nodes && nodes.length > 0) {
      let node = nodes[0];
      if (node.RawData instanceof Floor) {
        this.selectFloor(node.RawData);
      } else if (node.RawData instanceof Camera) {
      } else {
      }
    }
  }
  async selectCamera(camera: Camera) {
    let same = false;
    if (camera.FloorId) {
      if (this.floor) {
        if (camera.FloorId === this.floor.Id) {
          same = true;
        }
      }
      if (same == false) {
        this.floor = await this.business.getFloor(camera.FloorId);
      }
    }
  }
  async selectFloor(floor: Floor) {
    this.floor = floor;
    if (this.floor && this.floor.PlanUrl) {
      this.url = Medium.data(this.floor.PlanUrl);
      this.points = await this.business.load(this.floor.Id);
      this.filter = this.points.map((x) => x.id);
    }
  }

  onUnbindCameraSelected(camera: Camera) {
    this.camera = camera;
  }

  onsvg(url: string) {
    if (this.floor) {
      this.business.updatePlan(this.floor.Id, url).then((x) => {
        this.url = Medium.data(x.PlanUrl);
      });
    }
  }

  onMapChanged() {
    this.upload.emit();
  }

  cameraUnbind(camera: Camera) {
    camera.FloorId = undefined;
    this.business.setCamera(camera).then(async (camera) => {
      if (this.floor) {
        this.points = await this.business.load(this.floor.Id);
        this.loadSource.emit();
      }
    });
  }

  onMapDoubleClicked(position: Position) {
    console.log(position);
    if (this.camera && this.floor) {
      this.camera.FloorId = this.floor.Id;
      this.camera.Position = position;
      this.business.setCamera(this.camera).then((camera) => {
        if (this.floor) {
          this.business.load(this.floor.Id).then((points) => {
            this.points = points;
            this.filter = this.points.map((x) => x.id);
            this.loadSource.emit();
          });
        }
      });
    }
  }
}

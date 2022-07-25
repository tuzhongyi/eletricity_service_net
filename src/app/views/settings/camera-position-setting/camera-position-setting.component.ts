import { Component, OnInit } from '@angular/core';
import { CommonFlatNode } from 'src/app/components/common-tree/common-tree.model';

@Component({
  selector: 'howell-camera-position-setting',
  templateUrl: './camera-position-setting.component.html',
  styleUrls: ['./camera-position-setting.component.less'],
})
export class CameraPositionSettingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  selectTreeNode(node: CommonFlatNode[]) {}
}

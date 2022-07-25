import { Component, OnInit } from '@angular/core';
import { SettingPath } from './settings.model';

@Component({
  selector: 'howell-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  path: SettingPath = SettingPath.camera_position;
  SettingPath = SettingPath;

  ngOnInit(): void {}

  changePath(path: SettingPath) {
    this.path = path;
  }
}

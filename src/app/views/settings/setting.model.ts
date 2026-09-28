export enum SettingPathNode {
  basic = 'setting',
  camera_position = 'camera_position',
  camera_zone = 'camera_zone',
  service_sync = 'service_sync',
  employees_manager = 'employees_manager',
  subtitle = 'subtitle',
  camera = 'camera',
}
export class SettingPath {
  private static basic = 'index';
  static camera_position = `${this.basic}/${SettingPathNode.basic}/${SettingPathNode.camera_position}`;
  static camera_zone = `${this.basic}/${SettingPathNode.basic}/${SettingPathNode.camera_zone}`;
  static service_sync = `${this.basic}/${SettingPathNode.basic}/${SettingPathNode.service_sync}`;
  static employees_manager = `${this.basic}/${SettingPathNode.basic}/${SettingPathNode.employees_manager}`;
  static subtitle = `${this.basic}/${SettingPathNode.basic}/${SettingPathNode.subtitle}`;
  static camera = `${this.basic}/${SettingPathNode.basic}/${SettingPathNode.camera}`;
}

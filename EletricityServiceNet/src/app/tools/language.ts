import { CameraUsage } from '../enums/camera-usage.enum';
import { DeviceStatus } from '../enums/device-status.enum';
import { EventType } from '../enums/event-type.enum';

export class Language {
  static CameraUsage(usage: CameraUsage) {
    switch (usage) {
      case CameraUsage.AI:
        return 'AI';
      case CameraUsage.hotmap:
        return '热力图';
      case CameraUsage.monitor:
        return '摄像机';
      case CameraUsage.passenger:
        return '客流统计';

      default:
        return '未知';
    }
  }

  static DeviceStatus(status: DeviceStatus) {
    switch (status) {
      case DeviceStatus.online:
        return '在线';
      case DeviceStatus.offline:
      default:
        return '离线';
    }
  }

  static EventType(type: EventType) {
    switch (type) {
      case EventType.Business:
        return '业务行为';
      case EventType.Online:
        return '上线';
      case EventType.Offline:
        return '离线';
      case EventType.LeavePosition:
        return '离岗';
      case EventType.Falldown:
        return '倒地';
      case EventType.Loitering:
        return '滞留/徘徊';
      case EventType.Voilence:
        return '剧烈运动';
      case EventType.Spacing:
        return '间距异常';
      default:
        return '';
    }
  }
}

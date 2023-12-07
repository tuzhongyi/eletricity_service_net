import { formatDate } from '@angular/common';
import { CameraUsage } from '../enums/camera-usage.enum';
import { DeviceStatus } from '../enums/device-status.enum';
import { EventType } from '../enums/event-type.enum';
import { GenderType } from '../enums/gender-type.enum';
import { WeatherType } from '../enums/weather-type.enum';

export class Language {
  static Week(day: number, format: string = '周') {
    let name = ['日', '一', '二', '三', '四', '五', '六', '日'];
    return `${format}${name[day]}`;
  }

  static DateTime(date: Date, format: string) {
    return formatDate(date, format, 'en');
  }

  static Weather(weather: WeatherType) {
    switch (weather) {
      case WeatherType.Sunny:
        return '晴';
      case WeatherType.Cloudy:
        return '多云';
      case WeatherType.Overcast:
        return '阴';
      case WeatherType.Shower:
        return '阵雨';
      case WeatherType.Thunder:
        return '雷阵雨';
      case WeatherType.Sleet:
        return '雨夹雪';
      case WeatherType.LightRain:
        return '小雨';
      case WeatherType.Hailstone:
        return '冰雹';
      case WeatherType.ModerateRain:
        return '中雨';
      case WeatherType.HeavyRain:
        return '大雨';
      case WeatherType.Rainstorm:
        return '暴雨';
      case WeatherType.Snow:
        return '阵雪';

      default:
        return '';
    }
  }

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
        return '递交材料';
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
      // case EventType.Spacing:
      //   return '间距异常';
      case EventType.Run:
        return '人员奔跑';
      case EventType.HighDensity:
        return '人员聚集';
      // case EventType.Intrusion:
      //   return '区域入侵';
      // case EventType.Tripwire:
      //   return '越线(拌线) ';
      case EventType.Unattended:
        return '遗留物品';
      // case EventType.Removal:
      //   return '物品遗失';
      case EventType.PlayPhone:
        return '玩手机';
      case EventType.IllegalAudio:
        return '非正常音频';
      default:
        return '';
    }
  }
  static Gender(type?: GenderType) {
    switch (type) {
      case GenderType.man:
        return '男';
      case GenderType.woman:
        return '女';
      default:
        return '未知';
    }
  }
}

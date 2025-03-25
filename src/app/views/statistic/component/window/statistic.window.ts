import { Injectable } from '@angular/core';
import { MqttRequestService } from 'src/app/network/request/mqtt/mqtt.service';
import { StatisticAlarmWindow } from './statistic-alarm.window';
import { StatisticPictureWindow } from './statistic-picture.window';
import { StatisticVideoWindow } from './statistic-video.window';

@Injectable()
export class StatisticWindow {
  video = new StatisticVideoWindow();
  picture = new StatisticPictureWindow();
  alarm: StatisticAlarmWindow;
  constructor(mqtt: MqttRequestService) {
    this.alarm = new StatisticAlarmWindow(mqtt);
  }
}

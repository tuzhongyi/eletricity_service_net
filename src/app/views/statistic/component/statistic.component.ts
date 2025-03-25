import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { StatisticConfig } from 'src/app/models/config/config-statistic';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { Language } from 'src/app/tools/language';
import { PromiseValue } from 'src/app/tools/view-models/value.promise';
import { StatisticRecordListController } from './controller/statistic-record-list.controller';
import { StatisticController } from './controller/statistic.controller';
import { StatisticWindow } from './window/statistic.window';

@Component({
  selector: 'howell-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.less'],
  providers: [
    StatisticController,
    StatisticRecordListController,
    StatisticWindow,
  ],
})
export class StatisticComponent implements OnInit, OnDestroy {
  constructor(
    public controller: StatisticController,
    public window: StatisticWindow,
    config: ConfigRequestService
  ) {
    this.init(config);
  }

  load = new EventEmitter<void>();
  private config = new PromiseValue<StatisticConfig>();
  private handle?: NodeJS.Timeout;

  ngOnInit(): void {
    this.regist();
    this.keep();
  }
  ngOnDestroy(): void {
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }

  private async init(service: ConfigRequestService) {
    let config = await service.statistic.get();
    this.config.set(config);
  }

  private regist() {
    this.controller.recordlist.trigger.subscribe((data) => {
      this.config.get().then((config) => {
        if (config.alram) {
          if (this.window.alarm.show) {
            this.window.alarm.show = false;
          }
          setTimeout(() => {
            console.log('窗口弹出');
            this.window.alarm.data = data;
            this.window.alarm.name = Language.EventType(data.EventType);
            this.window.alarm.show = true;
          }, 10);
        }
      });
      this.load.emit();
    });
  }
  async keep() {
    let config = await this.config.get();
    let interval = config.interval ?? 5;

    this.handle = setInterval(() => {
      this.load.emit();
    }, interval * 1000 * 60);
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { StatisticConfig } from 'src/app/models/config/config-statistic';
import { StatisticCardPassengerFlowZoneBusiness } from './business/statistic-card-passenger-flow-zone.business';

@Component({
  selector: 'howell-statistic-card-passenger-flow-zone',
  templateUrl: './statistic-card-passenger-flow-zone.component.html',
  styleUrls: ['./statistic-card-passenger-flow-zone.component.less'],
  providers: [StatisticCardPassengerFlowZoneBusiness],
})
export class StatisticCardPassengerFlowZoneComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  constructor(public business: StatisticCardPassengerFlowZoneBusiness) {}

  datas: ITimeDataGroup<number>[] = [];
  config?: StatisticConfig;
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load();
      });
      this.subscription.add(sub);
    }
    this.init();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async init() {
    this.config = await this.business.config();
  }

  private async load() {
    this.datas = await this.business.load();
  }
}

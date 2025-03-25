import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticChartDeviceStateData } from '../../statistic-chart/statistic-chart-device-state/statistic-chart-device-state.model';
import { StatisticCardDeviceStateBusiness } from './business/statistic-card-device-state.business';

@Component({
  selector: 'howell-statistic-card-device-state',
  templateUrl: './statistic-card-device-state.component.html',
  styleUrls: ['./statistic-card-device-state.component.less'],
  providers: [StatisticCardDeviceStateBusiness],
})
export class StatisticCardDeviceStateComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;

  constructor(private business: StatisticCardDeviceStateBusiness) {}

  data = new StatisticChartDeviceStateData();
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load();
      });
      this.subscription.add(sub);
    }
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  load() {
    this.business.load().then((data) => {
      this.data = data;
    });
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticCardRecordTotalBusiness } from './business/statistic-card-record-total.business';
import { StatisticCardRecordTotalModel } from './statistic-card-record-total.model';

@Component({
  selector: 'howell-statistic-card-record-total',
  templateUrl: './statistic-card-record-total.component.html',
  styleUrls: ['./statistic-card-record-total.component.less'],
  providers: [StatisticCardRecordTotalBusiness],
})
export class StatisticCardRecordTotalComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: StatisticCardRecordTotalBusiness) {}

  data = new StatisticCardRecordTotalModel();
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

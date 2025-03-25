import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticCardPassengerFlowBusiness } from './business/statistic-card-passenger-flow.business';
import {
  StatisticCardPassengerFlowModel,
  StatisticCardPassengerFlowType,
} from './statistic-card-passenger-flow.model';

@Component({
  selector: 'howell-statistic-card-passenger-flow',
  templateUrl: './statistic-card-passenger-flow.component.html',
  styleUrls: ['./statistic-card-passenger-flow.component.less'],
  providers: [StatisticCardPassengerFlowBusiness],
})
export class StatisticCardPassengerFlowComponent implements OnInit, OnDestroy {
  @Input() type = StatisticCardPassengerFlowType.in;
  @Input('load') _load?: EventEmitter<void>;

  constructor(private business: StatisticCardPassengerFlowBusiness) {}

  data?: StatisticCardPassengerFlowModel;
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load(this.type);
      });
      this.subscription.add(sub);
    }
    this.load(this.type);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  load(type: StatisticCardPassengerFlowType) {
    this.business.load(type).then((data) => {
      this.data = data;
    });
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventType } from 'src/app/enums/event-type.enum';
import { SelectItem } from 'src/app/models/select-item.model';
import { Language } from 'src/app/tools/language';
import { StatisticCardRecordItemBusiness } from './business/statistic-card-record-item.business';
import { StatisticCardRecordItemProviders } from './business/statistic-card-record-item.provider';
import { StatisticCardRecordItemModel } from './statistic-card-record-item.model';

@Component({
  selector: 'howell-statistic-card-record-item',
  templateUrl: './statistic-card-record-item.component.html',
  styleUrls: ['./statistic-card-record-item.component.less'],
  providers: [...StatisticCardRecordItemProviders],
})
export class StatisticCardRecordItemComponent implements OnInit, OnDestroy {
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: StatisticCardRecordItemBusiness) {}

  types: SelectItem[] = [];
  data?: StatisticCardRecordItemModel;
  type: EventType = EventType.LeavePosition;
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load();
      });
      this.subscription.add(sub);
    }
    this.init.type();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init = {
    type: async () => {
      let config = await this.business.config();
      let types = config.eventtypes;
      this.types = types.map((type) => {
        return {
          value: type,
          language: `今日${Language.EventType(type)}`,
        };
      });
    },
  };

  async load() {
    this.data = await this.business.load(this.type);
  }
}

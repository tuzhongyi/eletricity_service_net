import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeStatisticPassengerBusiness } from './realtime-statistic-passenger.business';
import { RealtimeStatisticBusiness } from './realtime-statistic.business';
import { RealtimeStatisticModel } from './realtime-statistic.model';

@Component({
  selector: 'howell-realtime-statistic',
  templateUrl: './realtime-statistic.component.html',
  styleUrls: ['./realtime-statistic.component.less'],
  providers: [RealtimeStatisticPassengerBusiness, RealtimeStatisticBusiness],
})
export class RealtimeStatisticComponent
  implements IComponent<IModel, RealtimeStatisticModel>, OnInit
{
  @Input()
  business: IBusiness<IModel, RealtimeStatisticModel>;
  constructor(
    business: RealtimeStatisticBusiness,
    private store: StoreService
  ) {
    this.business = business;
  }

  data: RealtimeStatisticModel = new RealtimeStatisticModel();
  ngOnInit(): void {
    this.loadData();
    this.store.interval.subscribe((x) => {
      this.loadData();
    });
  }

  async loadData() {
    this.data = await this.business.load();
  }
}

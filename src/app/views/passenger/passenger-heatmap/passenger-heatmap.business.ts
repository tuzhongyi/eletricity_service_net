import { Injectable } from '@angular/core';
import { GetHeatMapParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { PassengerHeatmapArgs } from './passenger-heatmap.model';

@Injectable()
export class PassengerHeatmapBusiness {
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}

  async getData(args: PassengerHeatmapArgs) {
    let params = new GetHeatMapParams();
    let hall = await this.store.getBusinessHall();
    params.HallId = hall.Id;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    return this.service.heatMap.list(params).then((datas) => {
      let res = datas.filter((x) => x.FloorId === args.floorId);
      return res;
    });
  }

  async getFloors(hallId?: string) {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    return this.service.floor.array(hallId!);
  }

  image(id: string) {
    return this.service.floor.plan.get(id);
  }
}

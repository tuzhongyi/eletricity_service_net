import { Injectable } from '@angular/core';
import { CommonNestNode } from 'src/app/components/common-tree/common-tree.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { TreeFloorsConverter } from './floor-camera-tree.converter';

@Injectable()
export class TreeFloorBusiness
  implements IBusiness<Floor[], CommonNestNode<Floor>[]>
{
  constructor(
    private store: StoreService,
    private service: BusinessHallRequestService
  ) {}
  Converter: IConverter<Floor[], CommonNestNode<Floor>[]> =
    new TreeFloorsConverter();
  async load(hallId?: string): Promise<CommonNestNode<Floor>[]> {
    if (!hallId) {
      let hall = await this.store.getBusinessHall();
      hallId = hall.Id;
    }
    let data = await this.getData(hallId);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(hallId: string): Promise<Floor[]> {
    return this.service.floor.array(hallId);
  }
}

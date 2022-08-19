import { EventEmitter, Injectable } from '@angular/core';
import { CommonNestNode } from 'src/app/components/common-tree/common-tree.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';
import { GetCamerasParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import {
  TreeCameraItemConverter,
  TreeCamerasConverter,
} from './floor-camera-tree.converter';

@Injectable()
export class TreeCameraBusiness
  implements IBusiness<Camera[], CommonNestNode<Camera>[]>
{
  constructor(private service: BusinessHallRequestService) {}
  Converter: IConverter<Camera[], CommonNestNode<Camera>[]> =
    new TreeCamerasConverter();
  async load(
    floorId: string,
    floors: CommonNestNode[],
    operation: boolean = false
  ): Promise<CommonNestNode<Camera>[]> {
    let data = await this.getData(floorId);
    let model = await this.Converter.Convert(
      data,
      {
        floor: (id: string) => {
          return floors.filter((x) => x.Id === id);
        },
      },
      operation
    );
    return model;
  }
  async getData(floorId: string): Promise<Camera[]> {
    let params = new GetCamerasParams();
    params.FloorIds = [floorId];
    let paged = await this.service.camera.list(params);
    return paged.Data;
  }
}

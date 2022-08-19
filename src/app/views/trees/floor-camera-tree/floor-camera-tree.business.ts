import { EventEmitter, Injectable } from '@angular/core';
import { CommonNestNode } from 'src/app/components/common-tree/common-tree.model';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';
import { TreeCameraBusiness } from './floor-camera-tree-camera.business';
import { TreeFloorBusiness } from './floor-camera-tree-floor.business';

@Injectable()
export class FloorCameraTreeBusiness
  implements IBusiness<(Floor | Camera)[], CommonNestNode<Floor | Camera>[]>
{
  constructor(
    private floor: TreeFloorBusiness,
    private camera: TreeCameraBusiness
  ) {}
  Converter!:
    | IConverter<(Floor | Camera)[], CommonNestNode<Floor | Camera>[]>
    | IPromiseConverter<(Floor | Camera)[], CommonNestNode<Floor | Camera>[]>;
  getData(...args: any): Promise<(Floor | Camera)[]> {
    throw new Error('Method not implemented.');
  }

  async load(operation: boolean): Promise<CommonNestNode<Floor | Camera>[]> {
    let floors = await this.floor.load();
    for (let i = 0; i < floors.length; i++) {
      const floor = floors[i];
      let camera = await this.camera.load(floor.Id, floors, operation);
      floor.HasChildren = !!camera;
      floor.childrenChange.next(camera);
    }
    return floors;
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonTree } from 'src/app/components/common-tree/common-tree';
import { CommonTreeComponent } from 'src/app/components/common-tree/common-tree.component';
import {
  CommonFlatNode,
  CommonNestNode,
} from 'src/app/components/common-tree/common-tree.model';
import { SelectStrategy } from 'src/app/enums/select-strategy.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';
import { IModel } from 'src/app/models/model.interface';
import { TreeCameraBusiness } from './floor-camera-tree-camera.business';
import { TreeFloorBusiness } from './floor-camera-tree-floor.business';
import { FloorCameraTreeBusiness } from './floor-camera-tree.business';

@Component({
  selector: 'howell-floor-camera-tree',
  templateUrl: './floor-camera-tree.component.html',
  styleUrls: ['./floor-camera-tree.component.less'],
  providers: [TreeFloorBusiness, TreeCameraBusiness, FloorCameraTreeBusiness],
})
export class FloorCameraTreeComponent
  extends CommonTree
  implements IComponent<IModel[], CommonNestNode<IModel>[]>, OnInit
{
  @Input() holdStatus = true;

  // 第一个节点被选中
  @Input() selectOnFirst = true;

  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  @Output()
  nodeButtonClick: EventEmitter<CommonFlatNode> = new EventEmitter<CommonFlatNode>();

  constructor(business: FloorCameraTreeBusiness) {
    super();
    this.business = business;
  }
  business: IBusiness<IModel[], CommonNestNode<IModel>[]>;

  datas = new BehaviorSubject<CommonNestNode<IModel>[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    let datas = await this.business.load();
    this.datas.next(datas);
  }
}

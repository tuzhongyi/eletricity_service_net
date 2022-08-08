import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  implements IComponent<IModel[], CommonNestNode<IModel>[]>, OnInit, OnChanges
{
  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  @Output()
  nodeButtonClick: EventEmitter<Camera> = new EventEmitter<Camera>();
  @Input()
  load?: EventEmitter<string>;

  constructor(business: FloorCameraTreeBusiness) {
    super();
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData();
        });
      }
    }
  }
  business: IBusiness<IModel[], CommonNestNode<IModel>[]>;

  datas = new BehaviorSubject<CommonNestNode<IModel>[]>([]);

  config: Config = {
    tree: {
      defaultIds: [],
      depth: 0,
      holdStatus: true,
    },
  };

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    let datas = await this.business.load();
    this.datas.next(datas);

    if (datas && datas.length > 0) {
      this.config.tree.defaultIds = [datas[0].Id];
      this.config.tree.depth = 1;
    }
  }

  async onNodeButtonClicked(node: CommonFlatNode) {
    let datas = await this.business.load();
    this.datas.next(datas);
    this.nodeButtonClick.emit(node.RawData);
  }
}

interface Config {
  tree: TreeConfig;
}

interface TreeConfig {
  defaultIds: string[];
  depth: number;
  holdStatus: boolean;
}

import { BehaviorSubject } from 'rxjs';

export interface CommonTreeModel {
  Name: string;
  Id: string;
  [key: string]: any;
}

export class CommonNestNode<T = any> implements CommonTreeModel {
  readonly childrenChange = new BehaviorSubject<CommonNestNode[]>([]);

  Id!: string;
  Name!: string;
  HasChildren!: boolean;
  ParentId!: string | null;
  ChildrenLoaded!: boolean;
  ParentNode!: CommonNestNode | null;
  IconClass!: string;
  RawData!: T;
  hideArrow?: boolean;
  ButtonIconClasses: string[] = [];
}

export class CommonFlatNode<T = any> implements CommonTreeModel {
  Id!: string;
  Name!: string;
  Level!: number;
  Expandable!: boolean;
  ParentId!: string | null;
  ParentNode!: CommonFlatNode | null;
  IconClass!: string;
  RawData!: T;
  hideArrow?: boolean;
  ButtonIconClasses: string[] = [];
  CurrentButtonIndex?: number;
}

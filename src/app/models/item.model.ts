import { IModel } from './model.interface';

export interface IItemModel extends IModel {
  Id: string;
  Name: string;
}
export class ItemModel<T = any> implements IItemModel {
  Id: string = '';
  Name: string = '';
  data?: T;
}

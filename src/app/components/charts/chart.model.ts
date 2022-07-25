import { ImageControlModel } from 'src/app/models/image-control.model';
import { ItemModel } from 'src/app/models/item.model';

export interface ITimeData<T> {
  time: Date;
  value: T;
  index?: number;
}
export interface ImageTimeData<T> extends ITimeData<T> {
  image: ImageControlModel;
}

export interface ITimeDataGroup<T> extends ItemModel {
  datas: ITimeData<T>[];
}

import { IModel } from '../models/model.interface';
import { IBusiness } from './business.interface';

export interface IComponent<TModel extends IModel, TViewModel> {
  business: IBusiness<TModel, TViewModel>;
}

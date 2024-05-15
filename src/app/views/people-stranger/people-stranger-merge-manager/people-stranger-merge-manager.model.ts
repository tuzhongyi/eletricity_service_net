import { Stranger } from 'src/app/models/stranger.model';
import { IPeopleStrangerListOptions } from '../people-stranger-list/people-stranger-list.model';

export class PeopleStrangerMergeListOptions
  implements IPeopleStrangerListOptions
{
  pageIndex: number = 1;
  pageSize: number = 28;
  datas: Stranger[] = [];
}

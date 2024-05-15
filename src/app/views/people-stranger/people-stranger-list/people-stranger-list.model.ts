export interface IPeopleStrangerListOptions {
  pageIndex: number;
  pageSize: number;
}

export class PeopleStrangerListOptions implements IPeopleStrangerListOptions {
  pageIndex = 1;
  pageSize = 28;

  begin?: Date;
  end?: Date;
  enabled?: boolean;
  occurrence = 0;
  desc: boolean = false;
}

export interface IPeopleStrangerListOptions {
  pageIndex: number;
  pageSize: number;
}

export class PeopleStrangerListOptions implements IPeopleStrangerListOptions {
  constructor() {
    this.end = new Date();
    this.begin = new Date(this.end.getFullYear(), 0, 1);
  }
  pageIndex = 1;
  pageSize = 28;

  begin: Date;
  end: Date;
  enabled?: boolean;
  occurrence = 0;
  desc: boolean = false;
}

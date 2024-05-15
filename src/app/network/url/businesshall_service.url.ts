export interface IInnerUrl {
  basic(): string;
}

export abstract class AInnerUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}`;
  }
  item(id: string) {
    return `${this.basic()}/${id}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}

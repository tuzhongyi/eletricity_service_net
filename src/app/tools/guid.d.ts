declare class Guid {
  constructor(g: string | Array<any>);
  Equals: (o: any) => boolean;
  IsGuid: boolean;
  ToString: (format: string) => string;
  static Empty(): Guid;
  static NewGuid(): Guid;
}

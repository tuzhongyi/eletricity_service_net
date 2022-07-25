import { Exclude, Transform } from 'class-transformer';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { transformDateTime } from 'src/app/models/transform.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export interface IParams {}
export class PagedParams implements IParams {
  /**页码[1-n](可选) */
  PageIndex?: number = 1;
  /**分页大小[1-100](可选) */
  PageSize?: number = 9999;
}
export class DurationParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;

  static from(duration: { begin: Date; end: Date }) {
    let params = new DurationParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return params;
  }
}
export class PagedDurationParams extends PagedParams {
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
}

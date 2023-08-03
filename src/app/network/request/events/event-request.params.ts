import { EventType } from 'src/app/enums/event-type.enum';
import { IParams, PagedDurationParams } from '../IParams.interface';

export class GetEventRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	Int32[]	事件类型	O */
  EventTypes?: EventType[];
  /**	String[]	资源ID	O */
  ResourceIds?: string[];
  /**	String	资源名称	O */
  ResourceName?: string;
  /**	String[]	营业厅ID	O */
  HallIds?: string[];
  /**	String	营业厅名称	O */
  HallName?: string;
  /**	String[]	楼层ID	O */
  FloorIds?: string[];
  /**	String	楼层名称	O */
  FloorName?: string;
  /**	String[]	区域ID	O */
  ZoneIds?: string[];
  /**	String	区域名称	O */
  ZoneName?: string;
  /**	String	正常排序	O */
  Asc?: string;
  /**	String	倒置排序	O */
  Desc?: string;
}

export class GetTrackRecordsParams
  extends PagedDurationParams
  implements IParams
{
  /**	String[]	资源ID	O	*/
  ResourceIds?: string[];
  /**	String	资源名称	O	*/
  ResourceName?: string;
  /**	String[]	营业厅ID	O	*/
  HallIds?: string[];
  /**	String	营业厅名称	O	*/
  HallName?: string;
  /**	String[]	楼层ID	O	*/
  FloorIds?: string[];
  /**	String	楼层名称	O	*/
  FloorName?: string;
  /**	String[]	区域ID	O	*/
  ZoneIds?: string[];
  /**	String	区域名称	O	*/
  ZoneName?: string;
  /**	String[]	员工ID	O	*/
  EmployeeIds?: string[];
  /**	String	姓名	O	*/
  EmployeeName?: string;
  /**	String	证件号	O	*/
  EmployeeIDNumber?: string;
  /**	String	正常排序	O	*/
  Asc?: string;
  /**	String	倒置排序	O	*/
  Desc?: string;
}

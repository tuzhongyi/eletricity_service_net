import { EventType } from '../enums/event-type.enum';

/** 事件数量 */
export class EventNumber {
  /**	Int32	事件类型	M */
  EventType!: EventType;
  /**	Int32	事件数量	M */
  Number!: number;
}

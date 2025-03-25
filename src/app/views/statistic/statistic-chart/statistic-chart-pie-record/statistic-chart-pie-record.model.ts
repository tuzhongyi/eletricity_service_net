import { EventType } from 'src/app/enums/event-type.enum';

export class StatisticChartPieRecordData {
  type: EventType = EventType.LeavePosition;
  color: { r: number; g: number; b: number } = { r: 0, g: 0, b: 0 };
  name = '';
  value = 0;
}

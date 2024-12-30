import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class PassengerHeatmapArgs {
  duration = DateTimeTool.allDay();
  floorId?: string;
}

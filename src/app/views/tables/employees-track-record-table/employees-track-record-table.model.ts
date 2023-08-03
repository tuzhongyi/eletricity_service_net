import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class EmployeesTrackRecordTableArgs {
  duration = DateTimeTool.allDay(new Date());
  name?: string;
}

export enum EmployeesTrackRecordTableLastCommand {
  image,
  video,
}

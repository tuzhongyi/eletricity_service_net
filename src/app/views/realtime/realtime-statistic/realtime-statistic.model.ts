export class RealtimeStatisticModel {
  [key: string]: number;
  in: number = 0;
  out: number = 0;
  record: number = 0;
  business: number = 0;
  delivery: number = 0;

  LeavePosition: number = 0;
  Falldown: number = 0;
  Loitering: number = 0;
  Voilence: number = 0;
  HighDensity: number = 0;
  device: number = 0;
  Unattended: number = 0;
}

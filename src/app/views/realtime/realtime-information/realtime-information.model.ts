export class RealtimeInformationModel {
  passenger = new RealtimePassengerInfo();
  record: number = 0;
  device: number = 0;
}

export class RealtimePassengerInfo {
  in: number = 0;
  out: number = 0;
  retention: number = 0;
}

import { EventType } from 'src/app/enums/event-type.enum';

export class MqttConfig {
  host!: string;
  port!: number;
  trigger?: MqttConfigTrigger;
}

class MqttConfigTrigger {
  duration = 10;
  eventtypes: EventType[] = [];
}

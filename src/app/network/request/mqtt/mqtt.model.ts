import { EventType } from 'src/app/enums/event-type.enum';

export class MqttConfig {
  host!: string;
  port!: number;
  username?: string;
  password?: string;
  trigger?: MqttConfigTrigger;
}

class MqttConfigTrigger {
  duration = 10;
  eventtypes: EventType[] = [];
}

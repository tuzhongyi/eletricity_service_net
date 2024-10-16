import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  IMqttMessage,
  IMqttServiceOptions,
  MqttService as Service,
} from 'ngx-mqtt';
import { Subscription } from 'rxjs';

export class MqttClient {
  private subscription?: Subscription;
  private options: IMqttServiceOptions;
  private service: Service;

  constructor(host: string, port: number) {
    this.options = {
      hostname: host,
      port: port,
      protocol: location.protocol.includes('https') ? 'wss' : 'ws',
    };
    this.service = new Service(this.options);
  }

  subscribe<T>(
    topic: string,
    fn?: (message: T) => Promise<void>,
    cls?: ClassConstructor<T>
  ) {
    this.subscription = this.service
      .observe(topic)
      .subscribe((message: IMqttMessage) => {
        if (fn) {
          let payload = JSON.parse(message.payload.toString());
          if (cls) {
            let data = plainToInstance(cls, payload) as T;
            fn(data);
          } else {
            fn(payload);
          }
        }
      });
  }

  publish(topic: string, message: string) {
    this.service.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

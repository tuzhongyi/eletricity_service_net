import { EventEmitter, Injectable } from '@angular/core';
import { HowellPreviewArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { EventRecord } from 'src/app/models/event-record.model';
import { MqttRequestService } from 'src/app/network/request/mqtt/mqtt.service';

@Injectable()
export class RealtimeTriggerController {
  constructor(private mqtt: MqttRequestService) {}

  private _duration?: number;
  get duration() {
    return new Promise<number>((resolve, reject) => {
      if (this._duration) {
        resolve(this._duration);
        return;
      }
      this.mqtt.config.then((x) => {
        this._duration = x.trigger?.duration;
        if (this._duration) {
          resolve(this._duration);
        } else {
          reject('duration is null');
        }
      });
    });
  }

  show = false;
  data?: EventRecord;

  name = '';

  event = { preview: new EventEmitter<HowellPreviewArgs>() };

  stop() {
    this.show = false;
  }

  preview(cameraId: string) {
    let args = new HowellPreviewArgs();
    args.cameraId = cameraId;
    this.event.preview.emit(args);
  }

  async autoclose() {
    let duration = await this.duration;
    if (duration > 0) {
      setTimeout(() => {
        this.stop();
      }, duration * 1000);
    }
  }

  onpreview() {
    if (this.data && this.data.ResourceId) {
      this.preview(this.data.ResourceId);
    }
  }
}

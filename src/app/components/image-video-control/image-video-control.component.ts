import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DeviceStatus } from 'src/app/enums/device-status.enum';

import { DurationParams } from 'src/app/network/request/IParams.interface';

import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
  PlaybackInterval,
} from './image-video-control.model';

@Component({
  selector: 'app-image-video-control',
  templateUrl: './image-video-control.component.html',
  styleUrls: ['./image-video-control.component.less'],
})
export class ImageVideoControlComponent implements OnInit, OnChanges {
  @Input()
  fulled = false;
  @Input()
  model?: ImageVideoControlModel;
  @Input()
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
  @Input()
  draw: boolean = false;
  @Input()
  playback?: EventEmitter<PlaybackInterval>;
  @Input() index = 0;

  @Output()
  onplay: EventEmitter<ImageVideoControlModel> = new EventEmitter();
  @Output()
  onstop: EventEmitter<boolean> = new EventEmitter();
  @Output()
  fullscreen: EventEmitter<ImageVideoControlModel> = new EventEmitter();

  constructor() {}
  DeviceStatus = DeviceStatus;
  get playing() {
    if (this.model) {
      return this.model.playing;
    }
    return false;
  }
  display = {
    operation: {
      play: false,
      fullscreen: false,
    },
    image: true,
    video: false,
  };
  tostop: EventEmitter<void> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {
      this.display.image = true;
      this.display.video = false;
      if (this.model.image) {
        this.display.operation.play =
          this.model.image.status == DeviceStatus.online;
        this.display.operation.fullscreen =
          this.model.image.status == DeviceStatus.online;
      }
    }
    if (changes['operation']) {
      this.display.operation.fullscreen = this.operation.fullscreen;
      this.display.operation.play = this.operation.play;
    }
    if (
      changes['playback'] &&
      changes['playback'].firstChange &&
      this.playback
    ) {
      if (this.playback.length > 0) {
        this.playback.unsubscribe();
      }
      this.playback.subscribe((x) => {
        this.onstoping();
        this.onplayback(x.CameraId, x);
      });
    }
  }

  ngOnInit(): void {
    this.display.operation.fullscreen = this.operation.fullscreen;
    this.display.operation.play = this.operation.play;
  }

  playClicked(event: Event) {
    this.display.image = false;
    this.display.operation.play = false;
    this.display.video = true;

    if (this.model) {
      this.preview(this.model.cameraId);
    }
  }

  preview(cameraId: string) {
    if (this.model) {
      this.display.image = false;
      this.display.video = true;
      this.model.preview(cameraId);
      this.onplay.emit(this.model);
    }
  }
  onplayback(cameraId: string, interval: DurationParams) {
    if (this.model) {
      this.display.image = false;
      this.display.video = true;
      this.model.playback(cameraId, interval.BeginTime, interval.EndTime);
      this.onplay.emit(this.model);
    }
  }

  onstoping() {
    this.display.image = true;
    this.display.video = false;
    this.display.operation.play = true;
    this.onstop.emit(this.playing);
  }

  fullscreenClicked(event: Event) {
    this.fullscreen.emit(this.model);
  }
  onVideoDestroy() {
    this.model?.stop();
    this.display.image = true;
    this.display.video = false;
  }
}

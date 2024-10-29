import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { AlarmViewModel } from './alram.model';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.less'],
})
export class AlarmComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  model: AlarmViewModel = {
    show: false,
  };

  @Input()
  background = true;
  @Input()
  title: string = '';

  @Input()
  closeButton = true;

  private _style: any = {
    width: '80%',
    height: '80%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  };
  public get style(): any {
    return this._style;
  }
  @Input()
  public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }

  @Output()
  OnClosing: EventEmitter<boolean> = new EventEmitter();

  @Input()
  status?: DeviceStatus;

  @Input()
  manualClose = false;

  constructor() {}

  @ViewChild('audio')
  audio?: ElementRef<HTMLAudioElement>;

  loop = true;

  ngOnInit() {}
  ngAfterViewInit(): void {
    if (this.audio) {
      this.audio.nativeElement.addEventListener('ended', (e) => {
        if (this.loop) {
          let target = e.target as HTMLAudioElement;
          setTimeout(() => {
            target.play();
          }, 1 * 1000);
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.loop = false;
  }

  closeButtonClick() {
    if (this.manualClose === false) {
      this.model.show = false;
    }
    this.OnClosing.emit(true);
  }
}

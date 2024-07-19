import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { wait } from 'src/app/tools/tools';

import { TimeItem, TimeModel } from './time-control.model';

declare let $: any;

@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.less'],
})
export class TimeControlComponent implements OnInit, AfterViewInit {
  @Input()
  time: TimeModel = new TimeModel();
  @Output()
  timeChange: EventEmitter<TimeModel> = new EventEmitter();

  @Input() begin?: TimeModel;

  @Input() end?: TimeModel;

  constructor() {}
  TimeItem = TimeItem;
  @ViewChild('hour')
  hour?: ElementRef;

  @ViewChild('minute')
  minute?: ElementRef;

  @ViewChild('second')
  second?: ElementRef;

  ngAfterViewInit(): void {
    wait(
      () => {
        return !!this.hour;
      },
      () => {
        this.wheel(this.hour!.nativeElement);
      }
    );
    wait(
      () => {
        return !!this.minute;
      },
      () => {
        this.wheel(this.minute!.nativeElement);
      }
    );
    wait(
      () => {
        return !!this.second;
      },
      () => {
        this.wheel(this.second!.nativeElement);
      }
    );
  }

  ngOnInit(): void {}

  wheel(element: HTMLInputElement) {
    $(element).each((index: number, element: HTMLElement) => {
      if (!element.onwheel) {
        element.onwheel = (event: any) => {
          event.preventDefault();
          let input = event.currentTarget as HTMLInputElement;
          let $this = $(event.currentTarget);
          let $inc = parseFloat($this.attr('step'));
          let $max = parseFloat($this.attr('max'));
          let $min = parseFloat($this.attr('min'));
          let $currVal = parseFloat($this.val());
          let { hour, minute, second } = this.time;

          if (this.end) {
            // 如果是开始时间组件,max不能超过结束时间
            if (Array.from(input.classList).includes('hour')) {
              $max = this.end.hour;
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour == this.end.hour
            ) {
              $max = this.end.minute;
            }
            if (
              Array.from(input.classList).includes('second') &&
              hour == this.end.hour &&
              minute == this.end.minute
            ) {
              $max = this.end.second;
            }
          } else if (this.begin) {
            // 如果是结束时间组件,min不能小于开始时间
            if (Array.from(input.classList).includes('hour')) {
              $min = this.begin.hour;
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour == this.begin.hour
            ) {
              $min = this.begin.minute;
            }
            if (
              Array.from(input.classList).includes('second') &&
              hour == this.begin.hour &&
              minute == this.begin.minute
            ) {
              $min = this.begin.second;
            }
          }

          // If blank, assume value of 0
          if (isNaN($currVal)) {
            $currVal = 0.0;
          }
          let value = $min;

          // Increment or decrement numeric based on scroll distance
          if (event.deltaY > 0) {
            if ($currVal + $inc <= $max) {
              value = $currVal + $inc;
            }
          } else {
            if ($currVal - $inc >= $min) {
              value = $currVal - $inc;
            } else {
              // 零时刻回退
              value = $max;
            }
          }
          let view = this.format(value);
          // $this.val(view);

          let array = ['hour', 'minute', 'second'];

          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (input.classList.contains(array[i])) {
              this.time[array[i]] = value;
              this.timeChange.emit(this.time);
              break;
            }
          }

          if (this.end) {
            if (Array.from(input.classList).includes('hour')) {
              //当前hour的值小于结束时间时，分钟和秒是无限制的，但等于结束时间时需要校准，不得超过结束时间
              if (value == this.end.hour) {
                minute = minute > this.end.minute ? this.end.minute : minute;
                second = second > this.end.second ? this.end.second : second;
              }
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour == this.end.hour
            ) {
              if (value == this.end.minute) {
                second = second > this.end.second ? this.end.second : second;
              }
            }
          } else if (this.begin) {
            if (Array.from(input.classList).includes('hour')) {
              //当前hour的值大于开始时间时，分钟和秒是无限制的，但等于开始时间时需要校准，不得小于开始时间
              if (value == this.begin.hour) {
                minute =
                  minute < this.begin.minute ? this.begin.minute : minute;
                second =
                  second < this.begin.second ? this.begin.second : second;
              }
            }
            if (
              Array.from(input.classList).includes('minute') &&
              hour == this.begin.hour
            ) {
              if (value == this.begin.minute) {
                second =
                  second < this.begin.second ? this.begin.second : second;
              }
            }
          }
        };
      }
    });
  }

  oninput(e: Event, item: TimeItem) {
    let input = e.currentTarget as HTMLInputElement;
    let value = parseInt(input.value);
    let max = parseInt(input.max);
    let min = parseInt(input.min);
    if (value > max) {
      value = max;
    }
    if (value < min) {
      value = min;
    }
    (e.target as HTMLInputElement).value = TimeModel.format(value);
    switch (item) {
      case TimeItem.hour:
        this.time.hour = value;
        break;
      case TimeItem.minute:
        this.time.minute = value;
        break;
      case TimeItem.second:
        this.time.second = value;
        break;

      default:
        break;
    }
  }

  format(num: number) {
    return num.toString().padStart(2, '0');
  }
}

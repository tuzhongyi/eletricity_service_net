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

import { TimeModel } from './time-control.model';

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
  onchange: EventEmitter<TimeModel> = new EventEmitter();

  @ViewChild('hour')
  hour?: ElementRef;

  @ViewChild('minute')
  minute?: ElementRef;

  @ViewChild('second')
  second?: ElementRef;

  constructor() {}
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

          let $this = $(event.currentTarget);
          let $inc = parseFloat($this.attr('step'));
          let $max = parseFloat($this.attr('max'));
          let $min = parseFloat($this.attr('min'));
          let $currVal = parseFloat($this.val());

          // If blank, assume value of 0
          if (isNaN($currVal)) {
            $currVal = 0.0;
          }
          let value = 0;

          // Increment or decrement numeric based on scroll distance
          if (event.deltaY > 0) {
            if ($currVal + $inc <= $max) {
              value = $currVal + $inc;
            }
          } else {
            if ($currVal - $inc >= $min) {
              value = $currVal - $inc;
            }
          }

          // $this.val(view);
          let input = event.currentTarget as HTMLInputElement;

          let array = ['hour', 'minute', 'second'];

          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (input.classList.contains(array[i])) {
              this.time[array[i]] = value;
              break;
            }
          }
          this.onchange.emit(this.time);
        };
      }
    });
  }
}

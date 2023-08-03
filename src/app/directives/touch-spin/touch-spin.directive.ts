import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HowellTouchSpinOptions } from './touch-spin.class';
declare var $: any;
@Directive({
  selector: '[appTouchSpin]',
})
export class TouchSpinDirective implements AfterViewInit, OnChanges {
  @Input() options = new HowellTouchSpinOptions();

  public get min(): number {
    return this.options.min;
  }
  @Input()
  public set min(v: number) {
    this.options.min = v;
  }
  public get max(): number {
    return this.options.max;
  }
  @Input()
  public set max(v: number) {
    this.options.max = v;
  }

  @Output() touchSpinChange = new EventEmitter();

  @Input()
  number?: number;
  @Output()
  numberChange: EventEmitter<number> = new EventEmitter();
  constructor(private _ele: ElementRef<HTMLInputElement>) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['number']) {
      if (this.number !== undefined) {
        let input = this._ele.nativeElement as HTMLInputElement;
        if (this.number > this.options.max) return;
        if (this.number < this.options.min) return;
        input.value = this.number.toString();
      }
    }
    if (changes['min'] && !changes['min'].firstChange) {
      this.change();
    } else if (changes['max'] && !changes['max'].firstChange) {
      this.change();
    } else {
    }
  }
  ngAfterViewInit(): void {
    this.init();
  }

  control: any;

  init() {
    this.control = $(this._ele.nativeElement)
      .TouchSpin(this.options)
      .on('change', (e: any) => {
        this.touchSpinChange.emit(this._ele.nativeElement.value);
        this.number = parseInt(this._ele.nativeElement.value);
        this.numberChange.emit(this.number);
      });
  }
  change() {
    if (this.control) {
      this.control.trigger('touchspin.updatesettings', this.options);
    }
  }
}

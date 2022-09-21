import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'customdate', pure: false })
export class CustomDatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return value.toString();
  }
}

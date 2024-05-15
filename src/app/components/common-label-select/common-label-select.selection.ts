import { EventEmitter } from '@angular/core';
import { IdNameModel } from 'src/app/models/model.interface';

export abstract class LabelSelection<T> {
  show = false;
  label_selecteds: IdNameModel[] = [];
  source_selecteds: T[] = [];
  select: EventEmitter<IdNameModel[]> = new EventEmitter();

  protected abstract convert(source: T): IdNameModel;

  onselect(items: T[]) {
    this.label_selecteds = items.map((x) => this.convert(x));
    this.select.emit(this.label_selecteds);
  }
}

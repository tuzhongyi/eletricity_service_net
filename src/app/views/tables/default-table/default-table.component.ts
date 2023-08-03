import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/models/select-item.model';

@Component({
  selector: 'howell-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['../table-list.less', './default-table.component.less'],
})
export class DefaultTableComponent implements OnInit {
  @Input()
  datas: SelectItem[] = [];
  @Output()
  select: EventEmitter<SelectItem> = new EventEmitter();

  constructor() {}

  selected?: SelectItem;
  ngOnInit(): void {}

  onselect(item: SelectItem) {
    this.selected = item;
    this.select.emit(item);
  }
}

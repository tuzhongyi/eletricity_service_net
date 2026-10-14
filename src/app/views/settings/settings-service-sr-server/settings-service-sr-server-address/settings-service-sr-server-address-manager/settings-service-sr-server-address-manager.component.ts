import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SRServerAddress } from 'src/app/models/sr-service-address.model';

@Component({
  selector: 'howell-settings-service-sr-server-address-manager',
  templateUrl: './settings-service-sr-server-address-manager.component.html',
  styleUrls: ['./settings-service-sr-server-address-manager.component.less'],
})
export class SettingsServiceSrServerAddressManagerComponent implements OnInit {
  /** 地址列表由父组件传入 */
  @Input() datas: SRServerAddress[] = [];
  /** 增删都回传父组件，由父组件决定怎么改自己的数据 */
  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<SRServerAddress> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  on = {
    add: () => {
      this.add.emit();
    },
    remove: (item: SRServerAddress) => {
      this.remove.emit(item);
    },
  };
}

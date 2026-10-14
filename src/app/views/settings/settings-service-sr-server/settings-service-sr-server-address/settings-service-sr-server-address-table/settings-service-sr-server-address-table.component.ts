import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SRServerAddress } from 'src/app/models/sr-service-address.model';

@Component({
  selector: 'howell-settings-service-sr-server-address-table',
  templateUrl: './settings-service-sr-server-address-table.component.html',
  styleUrls: [
    '../../../../tables/table.less',
    './settings-service-sr-server-address-table.component.less',
  ],
})
export class SettingsServiceSrServerAddressTableComponent implements OnInit {
  /** 地址列表由父组件传入 */
  @Input() datas: SRServerAddress[] = [];
  /** 只有删除，删哪一条由父组件决定 */
  @Output() remove: EventEmitter<SRServerAddress> = new EventEmitter();

  // 按内容给宽度，IP地址要放得下 192.168.1.10，否则会被省略号截断
  widths = ['auto', '10%', '15%', '10%', '10%', '10%', '10%', '55px'];
  minwidths = ['auto', '10%', '100px', '10%', '10%', '10%', '10%', '55px'];

  constructor() {}

  ngOnInit(): void {}

  onremove(item: SRServerAddress) {
    this.remove.emit(item);
  }
}

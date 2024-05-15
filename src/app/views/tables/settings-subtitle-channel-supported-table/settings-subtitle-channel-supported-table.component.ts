import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { Language } from 'src/app/tools/language';
import { SettingsSubtitleChannelTableConverter } from '../settings-subtitle-channel-table/settings-subtitle-channel-table.converter';
import { SubtitlingChannelModel } from '../settings-subtitle-channel-table/settings-subtitle-channel-table.model';
import { SettingsSubtitleChannelSupportedTableBusiness } from './settings-subtitle-channel-supported-table.business';
import { SettingsSubtitleChannelSupportedTableOptions } from './settings-subtitle-channel-supported-table.model';

@Component({
  selector: 'howell-settings-subtitle-channel-supported-table',
  templateUrl: './settings-subtitle-channel-supported-table.component.html',
  styleUrls: [
    '../table.less',
    './settings-subtitle-channel-supported-table.component.less',
  ],
  providers: [
    SettingsSubtitleChannelTableConverter,
    SettingsSubtitleChannelSupportedTableBusiness,
  ],
})
export class SettingsSubtitleChannelSupportedTableComponent
  implements IComponent<IModel, SubtitlingChannelModel[]>, OnInit
{
  @Input() business: IBusiness<IModel, SubtitlingChannelModel[]>;
  @Input() opts = new SettingsSubtitleChannelSupportedTableOptions();
  @Input() load?: EventEmitter<SettingsSubtitleChannelSupportedTableOptions>;
  @Output() loaded = new EventEmitter();

  @Input() selecteds: SubtitlingChannelModel[] = [];
  @Output() selectedsChange = new EventEmitter();

  constructor(business: SettingsSubtitleChannelSupportedTableBusiness) {
    this.business = business;
  }

  datas: SubtitlingChannelModel[] = [];
  widths = ['80px', 'auto', '200px', '150px', '100px', '150px', '150px'];

  Language = Language;

  ngOnInit(): void {
    this.loadData();
    if (this.load) {
      this.load.subscribe((x) => {
        this.opts = x;
        this.loadData();
      });
    }
  }

  loadData() {
    this.business.load(this.opts).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }

  onclick(e: Event, item: SubtitlingChannelModel) {
    e.stopImmediatePropagation();

    let index = this.selecteds.findIndex((x) => x.Id === item.Id);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
  onall(e: MatCheckboxChange) {
    if (e.checked) {
      this.selecteds = [...this.datas];
    } else {
      this.selecteds = [];
    }
    this.selectedsChange.emit(this.selecteds);
  }
}

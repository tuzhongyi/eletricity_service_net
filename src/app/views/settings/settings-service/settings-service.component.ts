import { Component, OnInit } from '@angular/core';
import { SettingsServiceBusiness } from './settings-service.business';

@Component({
  selector: 'howell-settings-service',
  templateUrl: './settings-service.component.html',
  styleUrls: ['./settings-service.component.less'],
  providers: [SettingsServiceBusiness],
})
export class SettingsServiceComponent implements OnInit {
  constructor(private business: SettingsServiceBusiness) {}

  srId?: string;
  psId?: string;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.business.getSRserver().then((array) => {
      if (array && array.length > 0) {
        this.srId = array[0].Id;
      }
    });

    this.business.getPassengerServer().then((array) => {
      if (array && array.length > 0) {
        this.psId = array[0].Id;
      }
    });
  }

  syncSRServer() {
    if (this.srId) {
      this.business.syncSRServer(this.srId);
    }
  }
  syncPassengerServer() {
    if (this.psId) {
      this.business.syncPassengerServer(this.psId);
    }
  }
  syncCenterID() {
    this.business.syncCenterID();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  SettingsServiceBusiness,
  SettingsServiceBusinesses,
} from './settings-service.business';

@Component({
  selector: 'howell-settings-service',
  templateUrl: './settings-service.component.html',
  styleUrls: ['./settings-service.component.less'],
  providers: [...SettingsServiceBusinesses],
})
export class SettingsServiceComponent implements OnInit {
  constructor(private business: SettingsServiceBusiness) {}

  srId?: string;
  passengerId?: string;
  analysisId?: string;
  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.business.sr.get().then((array) => {
      if (array && array.length > 0) {
        this.srId = array[0].Id;
      }
    });

    this.business.passenger.get().then((array) => {
      if (array && array.length > 0) {
        this.passengerId = array[0].Id;
      }
    });
    this.business.analysis.get().then((array) => {
      if (array && array.length > 0) {
        this.analysisId = array[0].Id;
      }
    });
  }

  syncSRServer() {
    if (this.srId) {
      this.business.sr.sync(this.srId);
    }
  }
  syncPassengerServer() {
    if (this.passengerId) {
      this.business.passenger.sync(this.passengerId);
    }
  }
  syncCenterID() {
    this.business.hall.sync();
  }

  syncAnalysisServer() {
    if (this.analysisId) {
      this.business.analysis.sync(this.analysisId);
    }
  }
}

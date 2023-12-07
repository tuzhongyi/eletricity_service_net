import { Injectable } from '@angular/core';
import { SettingsServiceAnalysisBusiness } from './settings-service-business/settings-service-analysis.business';
import { SettingsServiceHallBusiness } from './settings-service-business/settings-service-hall.business';
import { SettingsServicePassengerBusiness } from './settings-service-business/settings-service-passenger.business';
import { SettingsServiceSRBusiness } from './settings-service-business/settings-service-sr.business';

@Injectable()
export class SettingsServiceBusiness {
  constructor(
    public hall: SettingsServiceHallBusiness,
    public passenger: SettingsServicePassengerBusiness,
    public sr: SettingsServiceSRBusiness,
    public analysis: SettingsServiceAnalysisBusiness
  ) {}
}
export const SettingsServiceBusinesses = [
  SettingsServiceHallBusiness,
  SettingsServicePassengerBusiness,
  SettingsServiceSRBusiness,
  SettingsServiceAnalysisBusiness,
  SettingsServiceBusiness,
];

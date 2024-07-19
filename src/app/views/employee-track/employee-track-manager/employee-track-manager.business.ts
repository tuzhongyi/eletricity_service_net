import { Injectable } from '@angular/core';
import { TrackConfig } from 'src/app/models/config';
import { EmployeesTableBusiness } from '../../tables/employees-table/employees-table.business';
import { EmployeeTrackManagerService } from './employee-track-manager.service';

@Injectable()
export class EmployeeTrackManagerBusiness {
  constructor(
    public employee: EmployeesTableBusiness,
    private service: EmployeeTrackManagerService
  ) {}

  getConfig() {
    return this.service.config.track.get();
  }
  setConfig(config: TrackConfig) {
    this.service.config.track.set(config);
  }
}

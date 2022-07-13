import { Injectable } from '@angular/core';
import { BusinessHall } from 'src/app/models/business-hall.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  BusinessHall!: BusinessHall;
}

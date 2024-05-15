import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IPromiseConverter } from 'src/app/interfaces/converter.interface';

import { Camera } from 'src/app/models/camera.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { SettingsCameraZoneListBusiness } from './business/settings-camera-zone-list.business';
import { SettingsCameraZoneConverter } from './settings-camera-zone.converter';
import { SettingsCameraZoneModel } from './settings-camera-zone.model';

@Injectable()
export class SettingsCameraZoneBusiness
  implements IBusiness<Camera, SettingsCameraZoneModel>
{
  constructor(
    private store: StoreService,
    public zone: SettingsCameraZoneListBusiness,
    private service: BusinessHallRequestService
  ) {}
  getData(...args: any): Promise<Camera> {
    throw new Error('Method not implemented.');
  }
  Converter: IPromiseConverter<Camera, SettingsCameraZoneModel> =
    new SettingsCameraZoneConverter();
  loading?: EventEmitter<void> | undefined;
  async load(camera: Camera): Promise<SettingsCameraZoneModel> {
    let model = this.Converter.Convert(camera, {
      zone: (source: Camera) => {
        return this.zone.load(source.HallId!, source.Id);
      },
    });
    return model;
  }

  async picture(cameraId: string, picture: string) {
    let hall = await this.store.getBusinessHall();
    return this.service.camera.picture.upload(
      hall.Id,
      cameraId,
      picture,
      false
    );
  }

  async capturePicture(cameraId: string) {
    let hall = await this.store.getBusinessHall();
    return await this.service.camera.picture.capture(hall.Id, cameraId);
  }
}

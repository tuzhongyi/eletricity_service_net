import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { RealtimeDeviceModel } from './realtime-device-table.model';
import { RealtimeDeviceListTableConverter } from './realtime-device-table.converter';
import { Camera } from 'src/app/models/camera.model';

@Injectable()
export class RealtimeDeviceListTableBusiness
  implements IBusiness<Camera[], RealtimeDeviceModel<Camera>[]>
{
  constructor(private service: BusinessHallRequestService) {}

  Converter: IConverter<Camera[], RealtimeDeviceModel<Camera>[]> =
    new RealtimeDeviceListTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(...args: any): Promise<RealtimeDeviceModel<Camera>[]> {
    let data = await this.getData().catch(() => {
      let cameras = new Array();
      for (let i = 0; i < 14; i++) {
        let camera = new Camera();
        camera.Id = i.toString();
        camera.Name = '测试' + i;
        cameras.push(camera);
      }
      return cameras;
    });
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(...args: any): Promise<Camera[]> {
    let paged = await this.service.camera.list();
    return paged.Data;
  }
}

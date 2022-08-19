import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { SelectItem } from 'src/app/models/select-item.model';
import { CameraZone } from 'src/app/models/zone.model';

export class SettingsCameraZoneListConverter
  implements IConverter<CameraZone[], SelectItem<CameraZone>[]>
{
  item = new SettingsCameraZoneItemConverter();

  Convert(source: CameraZone[]): SelectItem<CameraZone>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

export class SettingsCameraZoneItemConverter
  implements IConverter<CameraZone, SelectItem<CameraZone>>
{
  Convert(source: CameraZone, ...res: any[]): SelectItem<CameraZone> {
    let item = new SelectItem();
    item.value = source;
    item.language = source.Name;
    return item;
  }
}

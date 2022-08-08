import { CommonNestNode } from 'src/app/components/common-tree/common-tree.model';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Floor } from 'src/app/models/floor.model';

export class TreeCamerasConverter
  implements IConverter<Camera[], CommonNestNode<Camera>[]>
{
  item = new TreeCameraItemConverter();
  Convert(
    source: Camera[],
    getter: { floor: (id: string) => CommonNestNode<Floor> }
  ): CommonNestNode<Camera>[] {
    return source.map((x) => {
      return this.item.Convert(x, getter);
    });
  }
}

export class TreeFloorsConverter
  implements IConverter<Floor[], CommonNestNode<Floor>[]>
{
  item = new TreeFloorItemConverter();
  Convert(source: Floor[], ...res: any[]): CommonNestNode<Floor>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

export class TreeFloorItemConverter
  implements IConverter<Floor, CommonNestNode<Floor>>
{
  Convert(source: Floor, ...res: any[]): CommonNestNode<Floor> {
    const node = new CommonNestNode();
    node.Id = source.Id;
    node.Name = source.Name ?? '';
    node.HasChildren = false;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = 'howell-icon-Floor';

    // node.IconClass = RegionNodeIconType.get(item.RegionType) ?? ''
    node.RawData = source;
    return node;
  }
}

export class TreeCameraItemConverter
  implements IConverter<Camera, CommonNestNode<Camera>>
{
  Convert(
    source: Camera,
    getter: { floor: (id: string) => CommonNestNode }
  ): CommonNestNode<Camera> {
    const node = new CommonNestNode();
    node.Id = source.Id;
    node.Name = source.Name;
    node.HasChildren = false;
    node.ChildrenLoaded = true;
    node.ParentId = source.FloorId ?? null;
    node.IconClass = 'howell-icon-video';
    if (source.FloorId) {
      node.ParentNode = getter.floor(source.FloorId);
    }

    node.ButtonIconClasses = ['howell-icon-Unlink'];
    // node.IconClass = RegionNodeIconType.get(item.RegionType) ?? ''
    node.RawData = source;
    return node;
  }
}

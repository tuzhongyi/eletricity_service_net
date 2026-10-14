import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { Camera } from 'src/app/models/camera.model';

export class CameraManagerWindow {
  details = new CameraManagerDetailsWindow();
  confirm = new CameraManagerConfirmWindow();
  video = new CameraManagerVideoWindow();

  clear() {
    this.details.clear();
    this.confirm.clear();
  }
  close() {
    this.details.show = false;
    this.confirm.show = false;
  }
}
class CameraManagerDetailsWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
  }
  // 10 个表单项：10 × 34px 输入框 + 9 × 20px 间距 = 520px
  // 弹窗内容区上下各留 52px 边框、里面还有 40px 标题行 + 40px 内边距 + 50px 按钮行 = 234px
  // 520 + 234 = 754，取 800 留点余量
  style = {
    width: '800px',
    height: '660px',
  };
  data?: Camera;
}
class CameraManagerConfirmWindow extends WindowViewModel {
  clear() {
    this.data = undefined;
    this.selecteds = [];
  }
  style = {
    width: '500px',
    height: '260px',
  };
  get language(): string {
    // 批量删除时给的是列表，单个删除时给的是 data
    if (this.selecteds.length > 0) {
      return `是否删除选中的 ${this.selecteds.length} 个摄像机 ?`;
    }
    return `是否删除 ${this.data?.Name} ?`;
  }
  data?: Camera;

  selecteds: Camera[] = [];
}
class CameraManagerVideoWindow extends WindowViewModel {
  cameraId?: string;
  mode: PlayMode = PlayMode.live;

  title: string = '';

  autoplay: boolean = true;
  begin?: Date;
  end?: Date;
  subtitle = false;
  style = {
    height: '80%',
    width: 'auto',
    aspectRatio: '16 / 10.2',
  };
}

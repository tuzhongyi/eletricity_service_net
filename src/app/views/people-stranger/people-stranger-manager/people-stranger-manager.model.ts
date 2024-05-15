import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { Stranger } from 'src/app/models/stranger.model';

export class PeopleStrangerManagerWindow {
  merge = new MergeWindow();
  record = new RecordWindow();
}

class MergeWindow extends WindowViewModel {
  style = {
    width: '70%',
    height: '80%',
  };
  title = '人员合并';
}
class RecordWindow extends WindowViewModel {
  title = '出现记录';
  style = {
    width: '75%',
    height: '85%',
  };
  data?: Stranger;
}

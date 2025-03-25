import { WindowViewModel } from 'src/app/components/window-control/window.model';

export class RecordPictureWindow extends WindowViewModel {
  constructor() {
    super();
  }

  url: string = '';
  isError: boolean = false;
  title: string = '';
  style = {
    width: '80%',
    height: 'calc(80% + 40px)',
  };
}

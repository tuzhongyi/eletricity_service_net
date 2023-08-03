import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { EmployeeModel } from 'src/app/views/tables/employees-table/employees-table.model';

export class EmployeeManagerWindow {
  details = new EmployeeManagerDetailsWindow();
  image = new EmployeeManagerImageWindow();
  confirm = new EmployeeManagerConfirmWindow();

  clear() {
    this.details.clear();
    this.image.clear();
    this.confirm.clear();
  }
  close() {
    this.details.show = false;
    this.image.show = false;
    this.confirm.show = false;
  }
}
class EmployeeManagerDetailsWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }
  style = {
    width: '600px',
    height: '680px',
  };
  model?: EmployeeModel;
}
class EmployeeManagerImageWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }
  style = {
    width: '40%',
    height: '50%',
  };
  model?: EmployeeModel;
}
class EmployeeManagerConfirmWindow extends WindowViewModel {
  clear() {
    this.model = undefined;
  }
  style = {
    width: '500px',
    height: '260px',
  };
  get language(): string {
    switch (this.command) {
      case EmployeeManagerCommand.remove:
        return `是否删除 ${this.model?.Name} ?`;
      case EmployeeManagerCommand.sync:
        return `是否同步用户?`;
      case EmployeeManagerCommand.sync_qustion:
        return `是否删除不匹配的项?`;
      default:
        return '';
    }
  }
  model?: EmployeeModel;
  command!: EmployeeManagerCommand;
}
export enum EmployeeManagerCommand {
  remove,
  sync,
  sync_qustion,
}

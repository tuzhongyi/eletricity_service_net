import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Stranger } from 'src/app/models/stranger.model';
import { PeopleStrangerListItemImageController } from './people-stranger-list-item-img.controller';
import { PeopleStrangerListItemBusiness } from './people-stranger-list-item.business';
import { PeopleStrangerListItemConverter } from './people-stranger-list-item.converter';
import {
  PeopleStrangerListItemOperable,
  StrangerModel,
} from './people-stranger-list-item.model';

@Component({
  selector: 'howell-people-stranger-list-item',
  templateUrl: './people-stranger-list-item.component.html',
  styleUrls: ['./people-stranger-list-item.component.less'],
  providers: [PeopleStrangerListItemBusiness, PeopleStrangerListItemConverter],
})
export class PeopleStrangerListItemComponent implements OnInit, OnChanges {
  @Input() data?: Stranger;
  @Input() selected = false;
  @Input() main = false;
  @Output() enabledChange = new EventEmitter<Stranger>();
  @Output() close = new EventEmitter<Stranger>();
  @Output() record = new EventEmitter<Stranger>();

  private _operable: PeopleStrangerListItemOperable = {};
  public get operable(): PeopleStrangerListItemOperable {
    return this._operable;
  }
  @Input()
  public set operable(v: PeopleStrangerListItemOperable) {
    this._operable = Object.assign(this._operable, v);
  }

  constructor(private business: PeopleStrangerListItemBusiness) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      if (this.data) {
        this.load(this.data);
      }
    }
  }

  image = new PeopleStrangerListItemImageController();
  model: StrangerModel = new StrangerModel();

  load(data: Stranger) {
    this.model = this.business.convert(data);
  }

  onenabled(e: Event) {
    if (this.data && this.operable.enabled) {
      e.stopImmediatePropagation();
      this.data.Enabled = !this.data.Enabled;
      this.enabledChange.emit(this.data);
    }
  }
  onrecord(e: Event) {
    if (this.data && this.operable.record) {
      e.stopImmediatePropagation();
      this.record.emit(this.data);
    }
  }
  onclose(e: Event) {
    if (this.data && this.operable.close) {
      e.stopImmediatePropagation();
      this.close.emit(this.data);
    }
  }
}

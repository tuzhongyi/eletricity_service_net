import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationPath } from './header-navigation/navigarion-path.enum';

@Component({
  selector: 'howell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Input() visibility: boolean = true;
  @Output() visibilityChange = new EventEmitter<boolean>();
  @Input() path: NavigationPath = NavigationPath.realtime;
  @Input() title: string = '';
  @Output() navigate: EventEmitter<NavigationPath> = new EventEmitter();
  @Input() date: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  onpathchanged(path: NavigationPath) {
    this.path = path;
    this.navigate.emit(path);
  }

  onvisibility() {
    this.visibility = !this.visibility;
    this.visibilityChange.emit(this.visibility);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrackConfig } from 'src/app/models/config/config';

@Component({
  selector: 'howell-employee-track-playback-config',
  templateUrl: './employee-track-playback-config.component.html',
  styleUrls: ['./employee-track-playback-config.component.less'],
})
export class EmployeeTrackPlaybackConfigComponent implements OnInit {
  @Input() config?: TrackConfig;
  @Output() ok: EventEmitter<TrackConfig> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  constructor() {}

  model?: TrackConfig;

  ngOnInit(): void {
    if (this.config) {
      let str = JSON.stringify(this.config);
      this.model = JSON.parse(str);
    }
  }

  onok() {
    this.ok.emit(this.model);
  }
  oncancel() {
    this.cancel.emit();
  }
  onbeginchange(value: number) {
    if (this.model) {
      if (value > this.model.duration) {
        this.model.duration = value;
      }
    }
  }
}

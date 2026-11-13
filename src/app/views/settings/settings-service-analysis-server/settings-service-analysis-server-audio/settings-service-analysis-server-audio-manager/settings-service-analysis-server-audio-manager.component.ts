import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AudioSource } from 'src/app/models/audio-source.model';

@Component({
  selector: 'howell-settings-service-analysis-server-audio-manager',
  templateUrl:
    './settings-service-analysis-server-audio-manager.component.html',
  styleUrls: [
    './settings-service-analysis-server-audio-manager.component.less',
  ],
})
export class SettingsServiceAnalysisServerAudioManagerComponent {
  @Input() serverId = '';
  /** 音频源增删改后由父组件 emit 一下刷新列表 */
  @Input() reload?: EventEmitter<void>;

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<AudioSource>();
  @Output() remove = new EventEmitter<AudioSource>();

  on = {
    add: () => {
      this.add.emit();
    },
    edit: (item: AudioSource) => {
      this.edit.emit(item);
    },
    remove: (item: AudioSource) => {
      this.remove.emit(item);
    },
  };
}

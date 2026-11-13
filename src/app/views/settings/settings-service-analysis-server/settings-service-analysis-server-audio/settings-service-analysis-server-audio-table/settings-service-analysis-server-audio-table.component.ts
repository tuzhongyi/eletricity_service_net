import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioSourceType } from 'src/app/enums/audio-source-type.enum';
import { AudioSource } from 'src/app/models/audio-source.model';
import { SettingsServiceAnalysisServerBusiness } from '../../business/settings-service-analysis-server.business';

@Component({
  selector: 'howell-settings-service-analysis-server-audio-table',
  templateUrl: './settings-service-analysis-server-audio-table.component.html',
  styleUrls: [
    '../../../../tables/table.less',
    './settings-service-analysis-server-audio-table.component.less',
  ],
  providers: [SettingsServiceAnalysisServerBusiness],
})
export class SettingsServiceAnalysisServerAudioTableComponent
  implements OnInit, OnChanges, OnDestroy
{
  /** 分析服务器ID，传入后列出该服务器下的所有音频源 */
  @Input() serverId = '';
  /** 需要刷新时由父组件 emit 一下 */
  @Input() reload?: EventEmitter<void>;

  @Output() loaded = new EventEmitter<AudioSource[]>();
  @Output() edit = new EventEmitter<AudioSource>();
  @Output() remove = new EventEmitter<AudioSource>();

  constructor(private business: SettingsServiceAnalysisServerBusiness) {}

  datas: AudioSource[] = [];
  widths = ['auto', '15%', '35%', '15%', '15%', '80px'];

  private subs = new Subscription();

  ngOnInit(): void {
    if (this.reload) {
      this.subs.add(
        this.reload.subscribe(() => {
          this.loadData();
        }),
      );
    }
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serverId'] && !changes['serverId'].isFirstChange()) {
      this.loadData();
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadData() {
    if (!this.serverId) {
      this.datas = [];
      this.loaded.emit(this.datas);
      return Promise.resolve();
    }
    return this.business.audio
      .array(this.serverId)
      .then((x) => {
        this.datas = x ?? [];
        this.loaded.emit(this.datas);
      })
      .catch(() => {
        this.datas = [];
        this.loaded.emit(this.datas);
      });
  }

  sourceType(type?: AudioSourceType) {
    switch (type) {
      case AudioSourceType.Camera:
        return '摄像机音频';
      case AudioSourceType.SoundHead:
        return '拾音头';
      default:
        return '未知';
    }
  }

  on = {
    edit: (item: AudioSource) => {
      this.edit.emit(item);
    },
    remove: (item: AudioSource) => {
      this.remove.emit(item);
    },
  };
}

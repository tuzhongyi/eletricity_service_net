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
import { Language } from 'src/app/tools/language';
import { SettingsServiceAnalysisServerBusiness } from '../../business/settings-service-analysis-server.business';

@Component({
  selector: 'howell-settings-service-analysis-server-audio-card-list',
  templateUrl:
    './settings-service-analysis-server-audio-card-list.component.html',
  styleUrls: [
    './settings-service-analysis-server-audio-card-list.component.less',
  ],
  providers: [SettingsServiceAnalysisServerBusiness],
})
export class SettingsServiceAnalysisServerAudioCardListComponent
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

  emotions(item: AudioSource) {
    if (!item.Emotions || item.Emotions.length === 0) return '-';
    return item.Emotions.map((x) => Language.AlarmEmotion(x)).join('，');
  }

  keywords(item: AudioSource) {
    if (!item.Keywords || item.Keywords.length === 0) return '-';
    return item.Keywords.join('，');
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

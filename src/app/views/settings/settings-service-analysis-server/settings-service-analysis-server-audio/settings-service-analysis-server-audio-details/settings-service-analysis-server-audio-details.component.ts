import { ENTER } from '@angular/cdk/keycodes';
import { KeyValue } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AudioSourceAlarmEmotion } from 'src/app/enums/audio-source-alarm-emotion.enum';
import { AudioSourceType } from 'src/app/enums/audio-source-type.enum';
import { AudioSource } from 'src/app/models/audio-source.model';
import { EnumTool } from 'src/app/tools/enum-tool/enum.tool';
import { Language } from 'src/app/tools/language';

@Component({
  selector: 'howell-settings-service-analysis-server-audio-details',
  templateUrl:
    './settings-service-analysis-server-audio-details.component.html',
  styleUrls: [
    './settings-service-analysis-server-audio-details.component.less',
  ],
})
export class SettingsServiceAnalysisServerAudioDetailsComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() data: AudioSource = new AudioSource();
  @Input() check?: EventEmitter<(checked: boolean) => void>;

  constructor(private toastr: ToastrService) {}

  SourceType = AudioSourceType;

  source = {
    emotions: [] as KeyValue<AudioSourceAlarmEmotion, string>[],
  };
  separatorKeys = [ENTER];
  private subs = new Subscription();

  ngOnInit(): void {
    this.init();
    this.regist();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.init();
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private init() {
    this.data.Emotions = this.data.Emotions ?? [];
    this.data.Keywords = this.data.Keywords ?? [];
    this.source.emotions = EnumTool.values(AudioSourceAlarmEmotion).map((x) => {
      return {
        key: x,
        value: Language.AlarmEmotion(x),
      };
    });
  }

  private regist() {
    if (this.check) {
      this.subs.add(
        this.check.subscribe((x) => {
          x(this.to.check());
        }),
      );
    }
  }

  to = {
    check: () => {
      if (!this.data.Name) {
        this.toastr.warning('请输入音频源名称');
        return false;
      }
      if (this.data.SourceType == undefined) {
        this.toastr.warning('请选择来源类型');
        return false;
      }
      let volume = this.data.VolumeThreshold;
      if (volume != undefined && (volume < 0 || volume > 100)) {
        this.toastr.warning('报警分贝阈值范围是 0-100');
        return false;
      }
      return true;
    },
  };

  emotion(value: AudioSourceAlarmEmotion) {
    return this.data.Emotions?.includes(value) ?? false;
  }

  on = {
    alarm: (value: boolean) => {
      this.data.DefaultIsAlarm = value;
    },
    emotion: (value: AudioSourceAlarmEmotion, checked: boolean) => {
      let emotions = this.data.Emotions ?? [];
      if (checked) {
        if (!emotions.includes(value)) emotions = [...emotions, value];
      } else {
        emotions = emotions.filter((x) => x !== value);
      }
      this.data.Emotions = emotions.sort((a, b) => a - b);
    },
    keyword: {
      add: (event: MatChipInputEvent) => {
        const value = (event.value ?? '').trim();
        event.chipInput?.clear();
        if (!value) return;

        let keywords = this.data.Keywords ?? [];
        value
          .split(',')
          .map((x) => x.trim())
          .filter((x) => !!x && !keywords.includes(x))
          .forEach((x) => keywords.push(x));
        this.data.Keywords = [...keywords];
      },
      remove: (value: string) => {
        this.data.Keywords = (this.data.Keywords ?? []).filter(
          (x) => x !== value,
        );
      },
    },
  };
}

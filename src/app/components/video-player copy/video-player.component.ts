import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { StreamType } from 'src/app/enums/stream-type.enum';
import { VideoModel } from 'src/app/models/video.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { base64encode, utf16to8 } from 'src/app/tools/base64';
import { wait } from 'src/app/tools/tools';
import default_config from 'src/assets/configs/config.json';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
})
export class VideoPlayerComponent
  implements OnDestroy, OnInit, AfterViewInit, OnChanges
{
  @Input()
  url?: string;
  @Input()
  index = 0;

  @Input()
  model?: VideoModel;

  @Input()
  webUrl: string = default_config.videoUrl;

  @Input()
  name: string = '';
  @Output()
  destroy: EventEmitter<VideoModel> = new EventEmitter();

  @Output()
  onStoping: EventEmitter<number> = new EventEmitter();
  @Output()
  onPlaying: EventEmitter<number> = new EventEmitter();
  @Output()
  getPosition: EventEmitter<number> = new EventEmitter();
  @Output()
  onButtonClicked: EventEmitter<ButtonName> = new EventEmitter();
  @Output()
  onViewerDoubleClicked: EventEmitter<number> = new EventEmitter();
  @Output()
  onRuleStateChanged: EventEmitter<boolean> = new EventEmitter();
  @Output()
  onViewerClicked: EventEmitter<number> = new EventEmitter();

  src?: SafeResourceUrl;

  id: string = new Date().getTime().toString();

  PlayMode = PlayMode;

  getSrc(webUrl: string, url: string, cameraName?: string) {
    let result = webUrl + '?url=' + base64encode(url);
    if (cameraName) {
      let name = utf16to8(cameraName);
      result += '&name=' + base64encode(name);
    }
    result += '&index=' + this.index;
    return result;
  }

  @ViewChild('iframe')
  iframe!: ElementRef;

  private _player?: WSPlayerProxy;
  private get player(): WSPlayerProxy | undefined {
    if (!this.iframe || !this.iframe.nativeElement.contentWindow)
      return undefined;
    if (!this._player) {
      this._player = new WSPlayerProxy(this.id);
    }
    return this._player;
  }

  constructor(private sanitizer: DomSanitizer, config: ConfigRequestService) {
    config.get().then((x) => {
      this.webUrl = x.videoUrl;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && !changes['model'].firstChange) {
      this.loaded = false;
    }
    this.load();
  }
  ngAfterViewInit(): void {
    this.load();
  }
  ngOnInit(): void {
    this.load();
  }

  initWebUrl() {
    this.webUrl = this.webUrl.replace('127.0.0.1', location.hostname);
  }

  loaded = false;

  load() {
    if (!this.loaded) {
      this.initWebUrl();
      if (this.model) {
        this.url = this.model.toString();
      }

      if (this.url) {
        let src = this.getSrc(this.webUrl, this.url, this.name);
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
        this.loaded = true;
        wait(
          () => {
            return !!this.player;
          },
          () => {
            this.eventRegist();
          }
        );
      }
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destory();
    }
    if (this.registHandle) {
      clearTimeout(this.registHandle);
    }
    this.destroy.emit(this.model);
  }

  playing = false;

  _ruleState: boolean = false;

  stream: StreamType = StreamType.main;

  registHandle?: NodeJS.Timer;

  eventRegist() {
    if (this.player) {
      this.player.getPosition = (index: number, val: any) => {
        if (this.index != index) return;
        if (val >= 1) {
          this.playing = false;
        }
      };
      this.player.onPlaying = (index: number) => {
        if (this.index != index) return;
        setTimeout(() => {
          if (this._ruleState !== undefined && this.player) {
            this.changeRuleState(this._ruleState);
          }
        }, 1000);
        this.onPlaying.emit();
      };

      this.player.onStoping = (index: number) => {
        if (this.index != index) return;
        this.onStoping.emit(index);
      };
      this.player.getPosition = (index: number, value: number) => {
        if (this.index != index) return;
        this.getPosition.emit(value);
      };
      this.player.onButtonClicked = (index: number, btn: ButtonName) => {
        if (this.index != index) return;
        this.onButtonClicked.emit(btn);
      };
      this.player.onViewerDoubleClicked = (index: number) => {
        if (this.index != index) return;
        this.onViewerDoubleClicked.emit(index);
      };
      this.player.onViewerClicked = (index: number) => {
        if (this.index != index) return;
        this.onViewerClicked.emit(index);
      };
    }
  }

  play(model: VideoModel) {
    this.model = model;
    this.loaded = false;
    this.load();
  }

  async stop() {
    if (this.player) {
      return this.player.stop();
    }
    return;
  }

  download(filename: string, type: string) {
    if (this.player) {
      this.player.download(filename, type);
    }
  }
  resize(width: number, height: number) {
    if (this.player) {
      this.player.resize(width, height);
    }
  }
  fullScreen() {
    if (this.player) {
      this.player.fullScreen();
    }
  }
  frame() {
    if (this.player) {
      this.player.frame();
    }
  }
  resume() {
    if (this.player) {
      this.player.resume();
    }
  }
  speedResume() {
    if (this.player) {
      this.player.speedResume();
    }
  }
  pause() {
    if (this.player) {
      this.player.pause();
    }
  }
  capturePicture() {
    if (this.player) {
      this.player.capturePicture();
    }
  }
  slow() {
    if (this.player) {
      this.player.slow();
    }
  }
  fast() {
    if (this.player) {
      this.player.fast();
    }
  }
  changeRuleState(state: boolean) {
    if (this.player) {
      this.player.changeRuleState(state);
    }
  }
  seek(value: number) {
    if (this.player) {
      this.player.seek(value);
    }
  }

  onClick() {
    console.log('play-video click');
  }
}

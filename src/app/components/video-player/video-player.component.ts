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
import { StreamType } from 'src/app/enums/stream-type.enum';
import { HowellUrl } from 'src/app/models/howell-url.model';
import { VideoModel } from 'src/app/models/video.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { base64encode, utf16to8 } from 'src/app/tools/base64';
import { wait } from 'src/app/tools/tools';
import { VideoPlayerSubtitleBusiness } from './business/video-player-subtitle.business';
import { VideoPlayerBusiness } from './business/video-player.business';
import { VideoPlayerCreater as Creater } from './video-player.creater';
import { PlayerState, WSPlayerEventArgs } from './video-player.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less'],
  providers: [VideoPlayerSubtitleBusiness, VideoPlayerBusiness],
})
export class VideoPlayerComponent
  implements OnDestroy, OnInit, AfterViewInit, OnChanges
{
  @Input() url?: string;
  @Input() model?: VideoModel;
  @Input() webUrl: string = Creater.WebUrl();
  @Input() name: string = '';
  @Input() index = 0;
  @Input() subtitle = false;
  @Input() play?: EventEmitter<VideoModel>;
  @Input() stop?: EventEmitter<void>;
  @Input() download?: EventEmitter<{ filename: string; type: string }>;
  @Input() resize?: EventEmitter<{ width: number; height: number }>;
  @Input() fullscreen?: EventEmitter<void>;
  @Input() frame?: EventEmitter<void>;
  @Input() resume?: EventEmitter<void>;
  @Input() speedResume?: EventEmitter<void>;
  @Input() pause?: EventEmitter<void>;
  @Input() capturePicture?: EventEmitter<void>;
  @Input() slow?: EventEmitter<void>;
  @Input() fast?: EventEmitter<void>;
  @Input() changeRuleState?: EventEmitter<boolean>;
  @Input() seek?: EventEmitter<number>;

  @Output() loaded: EventEmitter<void> = new EventEmitter();
  @Output() destroy: EventEmitter<VideoModel> = new EventEmitter();
  @Output() onStoping: EventEmitter<number> = new EventEmitter();
  @Output() onPlaying: EventEmitter<number> = new EventEmitter();
  @Output() getPosition: EventEmitter<number> = new EventEmitter();
  @Output() onButtonClicked: EventEmitter<ButtonName> = new EventEmitter();
  @Output() onViewerDoubleClicked: EventEmitter<number> = new EventEmitter();
  @Output() onRuleStateChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() onViewerClicked: EventEmitter<number> = new EventEmitter();
  @Output() onSubtitleEnableChanged: EventEmitter<WSPlayerEventArgs> =
    new EventEmitter();

  constructor(
    private business: VideoPlayerBusiness,
    private sanitizer: DomSanitizer,
    private config: ConfigRequestService
  ) {}
  reserve: number = 15 * 1000;
  src?: SafeResourceUrl;
  isinited = false;
  isloaded = false;
  playing = false;
  stream: StreamType = StreamType.main;
  registHandle?: NodeJS.Timer;
  subtitleopened = false;
  private _ruleState: boolean = false;
  private _player?: WSPlayerProxy;
  private get player(): Promise<WSPlayerProxy> {
    return new Promise<WSPlayerProxy>((resolve) => {
      if (this._player) {
        resolve(this._player);
      }
      wait(
        () => {
          return !!this.iframe && !!this.iframe.nativeElement.contentWindow;
        },
        () => {
          if (!this._player) {
            this._player = new WSPlayerProxy(this.iframe.nativeElement);
          }
          resolve(this._player);
        }
      );
    });
  }

  @ViewChild('iframe') iframe!: ElementRef;

  getSrc(webUrl: string, url: string, cameraName?: string) {
    let result = webUrl + '?url=' + base64encode(url);
    if (cameraName) {
      let name = utf16to8(cameraName);
      result += '&name=' + base64encode(name);
    }
    result += '&index=' + this.index;
    return result;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && !changes['model'].firstChange) {
      this.isloaded = false;
    }

    this.load();
  }
  ngAfterViewInit(): void {
    this.load();
  }
  async ngOnInit() {
    this.regist();
    await this.init();
    this.load();
  }
  ngOnDestroy(): void {
    if (this.registHandle) {
      clearTimeout(this.registHandle);
    }
    this.destroy.emit(this.model);

    this.player.then((x) => {
      x.destroy();
    });
  }

  regist() {
    if (this.play) {
      this.play.subscribe((x) => {
        this.model = x;
        this.onplay(x);
      });
    }
    if (this.stop) {
      this.stop.subscribe((x) => {
        this.onstop();
      });
    }
    if (this.download) {
      this.download.subscribe((x) => {
        this.ondownload(x.filename, x.type);
      });
    }
    if (this.resize) {
      this.resize.subscribe((x) => {
        this.onresize(x.width, x.height);
      });
    }
    if (this.fullscreen) {
      this.fullscreen.subscribe((x) => {
        this.onfullScreen();
      });
    }
    if (this.frame) {
      this.frame.subscribe((x) => {
        this.onframe();
      });
    }
    if (this.resume) {
      this.resume.subscribe((x) => {
        this.onresume();
      });
    }
    if (this.speedResume) {
      this.speedResume.subscribe((x) => {
        this.onspeedResume();
      });
    }
    if (this.pause) {
      this.pause.subscribe((x) => {
        this.onpause();
      });
    }
    if (this.capturePicture) {
      this.capturePicture.subscribe((x) => {
        this.oncapturePicture();
      });
    }
    if (this.slow) {
      this.slow.subscribe((x) => {
        this.onslow();
      });
    }
    if (this.fast) {
      this.fast.subscribe((x) => {
        this.onfast();
      });
    }
    if (this.seek) {
      this.seek.subscribe((x) => {
        this.onseek(x);
      });
    }
  }

  async init() {
    let x = await this.config.get();
    let url = x.videoUrl
      .replace('localhost', location.hostname)
      .replace('127.0.0.1', location.hostname);
    this.webUrl = url;

    if (location.port === '9526') {
      this.webUrl = Creater.WebUrl();
    }
    this.isinited = true;
  }
  load() {
    wait(
      () => {
        return this.isinited;
      },
      () => {
        if (!this.isloaded) {
          if (this.model) {
            this.url = this.model.toString();
            if (this.model.web) {
              this.webUrl = this.model.web;
            }
          }

          if (this.url) {
            let src = this.getSrc(this.webUrl, this.url, this.name);
            this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
            this.isloaded = true;
            this.loaded.emit();
          }
        }
      }
    );
  }

  onLoad(event: Event) {
    let iframe = event.target as HTMLIFrameElement;
    if (iframe && iframe.src) {
      this.player.then((x) => {
        this.eventRegist(x);
      });
    }
  }

  async eventRegist(player: WSPlayerProxy) {
    player.onPlaying = (index: number = 0) => {
      if (this.index != index) return;
      this.onPlaying.emit();
      if (player && this.subtitle) {
        player.subtitleEnabled(this.subtitle);
      }
    };
    player.onRuleStateChanged = (index: number = 0, state: boolean) => {
      if (this.index != index) return;
      // this.saveRuleState(state);
      this.onRuleStateChanged.emit(state);
    };
    player.onStoping = (index: number = 0) => {
      if (this.index != index) return;
      this.onStoping.emit(index);
    };
    player.getPosition = (index: number = 0, value: number) => {
      if (this.index != index) return;
      if (value >= 1) {
        this.playing = false;
      }

      this.getPosition.emit(value);
    };
    player.getTimer = (index: number = 0, value: TimeArgs) => {
      if (this.index != index) return;
      if (this.subtitleopened) {
        if (player) {
          let item = this.business.subtitle.get(
            index,
            value.current - value.min
          );
          player.setSubtitle(item ? item.text ?? '' : '');
        }
      }
    };
    player.onSubtitleEnableChanged = (index: number, enabled: boolean) => {
      if (this.index != index) return;
      this.onSubtitleEnableChanged.emit({ index: index, value: enabled });
      this.subtitleopened = enabled;
      if (enabled && this.model) {
        this.business.subtitle.load(index, this.model);
      } else {
        this.business.subtitle.close(index);
      }
    };
    player.onButtonClicked = (index: number = 0, btn: ButtonName) => {
      if (this.index != index) return;
      this.onButtonClicked.emit(btn);

      new Promise((x) => {
        let url = new HowellUrl(this.webUrl);
        if (
          location.hostname !== url.Host &&
          location.port != url.Port.toString()
        ) {
          switch (btn) {
            case ButtonName.fullscreen:
              if (this.iframe) {
                (
                  this.iframe.nativeElement as HTMLIFrameElement
                ).requestFullscreen();
              }
              break;

            default:
              break;
          }
        }
      });
    };

    player.onViewerClicked = (index: number = 0) => {
      if (this.index != index) return;
      this.onViewerClicked.emit(index);
    };
    player.onViewerDoubleClicked = (index: number = 0) => {
      if (this.index != index) return;
      this.onViewerDoubleClicked.emit(index);
      new Promise((x) => {
        let url = new HowellUrl(this.webUrl);
        if (
          location.hostname !== url.Host &&
          location.port != url.Port.toString()
        ) {
          if (this.iframe) {
            (
              this.iframe.nativeElement as HTMLIFrameElement
            ).requestFullscreen();
          }
        }
      });
    };
    player.onStatusChanged = (index: number = 0, state: PlayerState) => {
      if (this.index != index) return;
      switch (state) {
        case PlayerState.playing:
          this.onseek(this.reserve);
          break;

        default:
          break;
      }
    };
  }
  onplay(model: VideoModel) {
    this.model = model;
    this.model.stream = this.stream;
    this.isloaded = false;
    this.load();
  }

  async onstop() {
    try {
      new Promise(() => {
        this.player.then((x) => {
          x.stop();
        });
      });
    } catch (error) {}
    this.src = undefined;
    return;
  }

  ondownload(filename: string, type: string) {
    this.player.then((x) => {
      x.download(filename, type);
    });
  }
  onresize(width: number, height: number) {
    this.player.then((x) => {
      x.resize(width, height);
    });
  }
  onfullScreen() {
    this.player.then((x) => {
      x.fullScreen();
    });
  }
  onframe() {
    this.player.then((x) => {
      x.frame();
    });
  }
  onresume() {
    this.player.then((x) => {
      x.resume();
    });
  }
  onspeedResume() {
    this.player.then((x) => {
      x.speedResume();
    });
  }
  onpause() {
    this.player.then((x) => {
      x.pause();
    });
  }
  oncapturePicture() {
    this.player.then((x) => {
      x.capturePicture();
    });
  }
  onslow() {
    this.player.then((x) => {
      x.slow();
    });
  }
  onfast() {
    this.player.then((x) => {
      x.fast();
    });
  }
  onseek(value: number) {
    this.player.then((x) => {
      x.seek(value);
    });
  }
}

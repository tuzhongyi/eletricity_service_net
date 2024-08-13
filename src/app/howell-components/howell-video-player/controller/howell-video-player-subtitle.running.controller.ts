import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';

export class HowellVideoPlayerSubtitleRunningController {
  constructor() {}

  private get isrunning() {
    return !!this.handle;
  }
  private handle?: NodeJS.Timer;
  private index = -1;
  private datas: SubtitlingItem[] = [];

  load(datas: SubtitlingItem[]) {
    this.datas = datas;
    this.stop();
  }

  run(selected: SubtitlingItem) {
    this.index = this.datas.findIndex((item) => item === selected);
    if (this.index === -1) return;

    this.handle = setTimeout(() => {
      this.dorun();
    }, 10);
  }

  get validity() {
    if (this.index === -1) return false;
    return this.index < this.datas.length;
  }

  getTime(begin: Date) {
    return new Promise<number>((resolve) => {
      setInterval(() => {}, 10);
    });
  }

  dorun() {
    if (this.validity) {
    }
    let item = this.datas[this.index];

    this.handle = setTimeout(() => {
      this.dorun();
    }, 10);

    this.index++;
  }

  stop() {
    this.index = -1;
    if (this.handle) {
      clearTimeout(this.handle!);
      this.handle = undefined;
    }
  }
}

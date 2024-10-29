import { EventEmitter, Injectable } from '@angular/core';
import { wait } from 'src/app/tools/tools';
import { PlayerState } from '../video-player.model';

@Injectable()
export class VideoPlayerKeepBusiness {
  load = new EventEmitter<void>();

  handle: { keep?: NodeJS.Timer; tryplay?: NodeJS.Timer } = {};
  keep(player: WSPlayerProxy) {
    if (this.handle.keep) {
      clearTimeout(this.handle.keep);
      this.handle.keep = undefined;
    }

    if (player.status === PlayerState.playing) {
      this.handle.keep = setTimeout(() => {
        this.try.stop(player);
        console.log('keep to stop');
        this.try.play(player);
      }, 15 * 1000);
    }
  }

  clear(args: { keep?: boolean; play?: boolean }) {
    if (args.keep && this.handle.keep) {
      clearTimeout(this.handle.keep);
      this.handle.keep = undefined;
    }

    if (args.play && this.handle.tryplay) {
      clearTimeout(this.handle.tryplay);
      this.handle.tryplay = undefined;
    }
  }

  try = {
    stop: (player: WSPlayerProxy) => {
      return new Promise<void>((resolve) => {
        player.stop();
        let handle: NodeJS.Timer | undefined = undefined;
        wait(
          () => {
            return player.status !== PlayerState.playing;
          },
          () => {
            if (handle) {
              clearTimeout(handle);
            }
            resolve();
          }
        );

        handle = setTimeout(() => {
          if (player.status === PlayerState.playing) {
            this.try.stop(player).then(() => {
              resolve();
            });
          }
        }, 5 * 1000);
      });
    },
    play: (player: WSPlayerProxy) => {
      wait(
        () => {
          return player.status !== PlayerState.playing;
        },
        () => {
          this.load.emit();
          console.log('keep to load');
          this.handle.tryplay = setTimeout(() => {
            if (player.status !== PlayerState.playing) {
              this.try.play(player);
            }
          }, 15 * 1000);
        }
      );
    },
  };
}

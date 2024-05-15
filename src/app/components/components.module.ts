import { CanvasComponent } from './canvas/canvas.component';
import { CardComponent } from './card/card.component';
import { CHART_COMPONENTS } from './charts/charts.module';
import { CommonLabelSelecComponent } from './common-label-select/common-label-select.component';
import { CommonTreeComponent } from './common-tree/common-tree.component';
import { ImageControlComponent } from './image-control/image-control.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageVideoControlComponent } from './image-video-control/image-video-control.component';
import { ImageVideoMultControlComponent } from './image-video-mult-control/image-video-mult-control.component';
import { ImageComponent } from './image/image.component';
import { TimeControlComponent } from './time-control/time-control.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { WindowComponent } from './window-control/window.component';

export const components = [
  VideoPlayerComponent,
  ImageVideoMultControlComponent,
  ImageVideoControlComponent,
  ImageControlComponent,
  CardComponent,
  TimeControlComponent,
  WindowComponent,
  ...CHART_COMPONENTS,
  CommonTreeComponent,
  CommonLabelSelecComponent,
  CanvasComponent,
  ImageUploadComponent,
  ImageComponent,
];

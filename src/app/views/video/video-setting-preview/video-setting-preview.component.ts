import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera } from 'src/app/models/camera.model';
import { VideoModel } from 'src/app/models/video.model';
import { VideoSettingPreviewBusiness } from './video-setting-preview.business';

@Component({
  selector: 'howell-video-setting-preview',
  templateUrl: './video-setting-preview.component.html',
  styleUrls: ['./video-setting-preview.component.less'],
  providers: [VideoSettingPreviewBusiness],
})
export class VideoSettingPreviewComponent implements OnInit {
  @Input() hallId?: string;
  @Input() camera?: Camera;
  @Output() cameraChange = new EventEmitter<Camera>();
  @Output() play: EventEmitter<VideoModel> = new EventEmitter();
  constructor(private business: VideoSettingPreviewBusiness) {}

  ngOnInit(): void {}

  async oncameraselect(camera: Camera) {
    this.camera = camera;
    this.cameraChange.emit(camera);
    let url = await this.business.getUrl(camera.Id);
    let model = new VideoModel(url.Url);
    this.play.emit(model);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera } from 'src/app/models/camera.model';
import { Duration } from 'src/app/models/duration.model';
import { VideoModel } from 'src/app/models/video.model';
import { VideoSettingPlaybackBusiness } from './video-setting-playback.business';

@Component({
  selector: 'howell-video-setting-playback',
  templateUrl: './video-setting-playback.component.html',
  styleUrls: ['./video-setting-playback.component.less'],
  providers: [VideoSettingPlaybackBusiness],
})
export class VideoSettingPlaybackComponent implements OnInit {
  @Input() hallId?: string;
  @Output() play: EventEmitter<VideoModel> = new EventEmitter();
  @Input() camera?: Camera;
  @Output() cameraChange = new EventEmitter<Camera>();

  constructor(private business: VideoSettingPlaybackBusiness) {}

  subtitle = {
    enabled: true,
  };

  ngOnInit(): void {}

  oncameraselect(camera: Camera) {
    this.camera = camera;
    this.cameraChange.emit(camera);
  }

  async onplayback(duration: Duration) {
    if (!this.camera) return;

    let url = await this.business.getUrl(this.camera.Id, duration);
    let model = new VideoModel(url.Url);
    this.play.emit(model);
  }
}

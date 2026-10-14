import { Injectable } from '@angular/core';
import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { AudioSource } from 'src/app/models/audio-source.model';
import { Floor } from 'src/app/models/floor.model';
import { PassengerServer } from 'src/app/models/passenger-server.model';
import { Resolution } from 'src/app/models/resolution.model';
import { SRServer } from 'src/app/models/sr-server.model';
import { AnalysisServerRequestService } from 'src/app/network/request/analysis/analysis-request.service';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { PassengerServerRequestService } from 'src/app/network/request/passenger/passenger-request.service';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { EnumTool } from 'src/app/tools/enum-tool/enum.tool';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class SettingCameraSource {
  floors: Floor[] = [];
  camerausages: CameraUsage[] = [];
  resolutions: { label: string; value: Resolution }[] = [
    { label: '3840 × 2160', value: { Width: 3840, Height: 2160 } },
    { label: '2560 × 1440', value: { Width: 2560, Height: 1440 } },
    { label: '1920 × 1080', value: { Width: 1920, Height: 1080 } },
    { label: '1280 × 720', value: { Width: 1280, Height: 720 } },
    { label: '704 × 576', value: { Width: 704, Height: 576 } },
    { label: '640 × 480', value: { Width: 640, Height: 480 } },
  ];
  server: {
    sr: SRServer[];
    passenger: PassengerServer[];
    analysis: {
      audio: {
        source: AudioSource[];
      };
    };
  } = {
    sr: [],
    passenger: [],
    analysis: {
      audio: {
        source: [],
      },
    },
  };

  loaded: {
    sr?: () => void;
    passenger?: () => void;
    audio?: () => void;
  } = {};

  constructor(
    private store: StoreService,
    hall: BusinessHallRequestService,
    passenger: PassengerServerRequestService,
    sr: SRServerRequestService,
    analysis: AnalysisServerRequestService,
  ) {
    this.service = { hall, passenger, sr, analysis };
    this.init();
  }

  private service: {
    hall: BusinessHallRequestService;
    passenger: PassengerServerRequestService;
    sr: SRServerRequestService;
    analysis: AnalysisServerRequestService;
  };

  private async init() {
    this.camerausages = EnumTool.values(CameraUsage);
    let hall = await this.store.getBusinessHall();
    this.service.hall.floor.array(hall.Id).then((x) => {
      this.floors = x;
    });
    this.service.passenger.array().then((x) => {
      this.server.passenger = x;
      if (this.loaded.passenger) {
        this.loaded.passenger();
      }
    });
    this.service.sr.array().then((x) => {
      this.server.sr = x;
      if (this.loaded.sr) {
        this.loaded.sr();
      }
    });
    this.service.analysis.audio.all().then((x) => {
      this.server.analysis.audio.source = x;
      if (this.loaded.audio) {
        this.loaded.audio();
      }
    });
  }
}

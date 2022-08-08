import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import { Position } from 'src/app/models/position.model';
import { SettingsMapBusiness } from './settings-map.business';

@Component({
  selector: 'howell-settings-map',
  templateUrl: './settings-map.component.html',
  styleUrls: ['./settings-map.component.less'],
  providers: [SettingsMapBusiness, HttpClient],
})
export class SettingsMapComponent implements OnInit, OnChanges {
  @Input()
  url: string = '';
  @Input()
  points: IPoint[] = [];
  @Output()
  svgSelected: EventEmitter<string> = new EventEmitter();
  @Input()
  upload?: EventEmitter<void>;
  @Output()
  ondblclick: EventEmitter<Position> = new EventEmitter();

  constructor(private business: SettingsMapBusiness) {}

  svg: string = '';

  @ViewChild('file')
  file?: ElementRef;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      if (this.url) {
        let data = await this.business.getBase64(this.url);
        // let code = Base64.decode(data);
        this.svg = decodeURIComponent(data);
      }
    }
    if (changes['upload']) {
      if (this.upload) {
        this.upload.subscribe((x) => {
          this.onupload();
        });
      }
    }
  }

  ngOnInit(): void {}

  onClick(position: Position) {}

  onDoubleClick(position: Position) {
    this.ondblclick.emit(position);
  }

  onPointClick(point: IPoint) {}

  onupload() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }

  fileChange() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.uploadFile(t_files[0]);
        this.file.nativeElement.value = null;
      }
    }
  }

  async uploadFile(file: any) {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.addEventListener('loadend', () => {
      let svg = reader.result as string;
      this.svgSelected.emit(svg);
    });
  }
}

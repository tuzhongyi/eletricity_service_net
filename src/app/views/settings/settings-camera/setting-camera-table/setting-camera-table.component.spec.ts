import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCameraTableComponent } from './setting-camera-table.component';

describe('SettingCameraTableComponent', () => {
  let component: SettingCameraTableComponent;
  let fixture: ComponentFixture<SettingCameraTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCameraTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCameraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

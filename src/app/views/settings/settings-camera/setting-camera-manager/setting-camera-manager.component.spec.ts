import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCameraManagerComponent } from './setting-camera-manager.component';

describe('SettingCameraManagerComponent', () => {
  let component: SettingCameraManagerComponent;
  let fixture: ComponentFixture<SettingCameraManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCameraManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCameraManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentBannerComponent } from './environment-banner.component';

describe('EnvironmentBannerComponent', () => {
  let component: EnvironmentBannerComponent;
  let fixture: ComponentFixture<EnvironmentBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

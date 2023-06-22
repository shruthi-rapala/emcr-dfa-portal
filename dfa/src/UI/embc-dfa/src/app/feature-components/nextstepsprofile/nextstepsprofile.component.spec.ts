import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextstepsprofileComponent } from './nextstepsprofile.component';

describe('NextstepsprofileComponent', () => {
  let component: NextstepsprofileComponent;
  let fixture: ComponentFixture<NextstepsprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextstepsprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextstepsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

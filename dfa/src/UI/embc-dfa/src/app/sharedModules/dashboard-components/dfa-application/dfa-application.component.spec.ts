import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfaApplicationComponent } from './dfa-application.component';

describe('DfaApplicationComponent', () => {
  let component: DfaApplicationComponent;
  let fixture: ComponentFixture<DfaApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DfaApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfaApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

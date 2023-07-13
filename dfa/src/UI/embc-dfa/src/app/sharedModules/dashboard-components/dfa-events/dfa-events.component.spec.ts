import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfaEventsComponent } from './dfa-events.component';

describe('DfaEventsComponent', () => {
  let component: DfaEventsComponent;
  let fixture: ComponentFixture<DfaEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DfaEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfaEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfaProfileComponent } from './dfa-profile.component';

describe('DfaProfileComponent', () => {
  let component: DfaProfileComponent;
  let fixture: ComponentFixture<DfaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DfaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

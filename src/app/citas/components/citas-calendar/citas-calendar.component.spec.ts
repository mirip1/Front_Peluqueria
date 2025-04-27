import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCalendarComponent } from './citas-calendar.component';

describe('CitasCalendarComponent', () => {
  let component: CitasCalendarComponent;
  let fixture: ComponentFixture<CitasCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

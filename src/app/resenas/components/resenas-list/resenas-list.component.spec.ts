import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResenasListComponent } from './resenas-list.component';

describe('ResenasListComponent', () => {
  let component: ResenasListComponent;
  let fixture: ComponentFixture<ResenasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResenasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResenasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

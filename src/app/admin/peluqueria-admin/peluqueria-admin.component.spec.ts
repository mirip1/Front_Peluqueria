import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeluqueriaAdminComponent } from './peluqueria-admin.component';

describe('PeluqueriaAdminComponent', () => {
  let component: PeluqueriaAdminComponent;
  let fixture: ComponentFixture<PeluqueriaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeluqueriaAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeluqueriaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

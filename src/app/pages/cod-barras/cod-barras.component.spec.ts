import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodBarrasComponent } from './cod-barras.component';

describe('CodBarrasComponent', () => {
  let component: CodBarrasComponent;
  let fixture: ComponentFixture<CodBarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodBarrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

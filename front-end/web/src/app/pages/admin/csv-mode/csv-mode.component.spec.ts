import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvModeComponent } from './csv-mode.component';

describe('CsvModeComponent', () => {
  let component: CsvModeComponent;
  let fixture: ComponentFixture<CsvModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsvModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

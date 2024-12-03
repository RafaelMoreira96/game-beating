import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLogComponent } from './register-log.component';

describe('LogComponent', () => {
  let component: RegisterLogComponent;
  let fixture: ComponentFixture<RegisterLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

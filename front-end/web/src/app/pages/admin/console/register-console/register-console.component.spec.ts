import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConsoleComponent } from './register-console.component';

describe('RegisterConsoleComponent', () => {
  let component: RegisterConsoleComponent;
  let fixture: ComponentFixture<RegisterConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

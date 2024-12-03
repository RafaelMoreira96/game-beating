import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGenreComponent } from './register-genre.component';

describe('RegisterGenreComponent', () => {
  let component: RegisterGenreComponent;
  let fixture: ComponentFixture<RegisterGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterGenreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

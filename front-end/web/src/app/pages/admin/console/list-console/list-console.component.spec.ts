import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsoleComponent } from './list-console.component';

describe('ListConsoleComponent', () => {
  let component: ListConsoleComponent;
  let fixture: ComponentFixture<ListConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

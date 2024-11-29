import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdatesLogComponent } from './project-updates-log.component';

describe('ProjectUpdatesLogComponent', () => {
  let component: ProjectUpdatesLogComponent;
  let fixture: ComponentFixture<ProjectUpdatesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectUpdatesLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUpdatesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

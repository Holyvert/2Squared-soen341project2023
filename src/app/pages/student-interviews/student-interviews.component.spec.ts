import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInterviewsComponent } from './student-interviews.component';

describe('StudentInterviewsComponent', () => {
  let component: StudentInterviewsComponent;
  let fixture: ComponentFixture<StudentInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentInterviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

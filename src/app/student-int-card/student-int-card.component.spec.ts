import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIntCardComponent } from './student-int-card.component';

describe('StudentIntCardComponent', () => {
  let component: StudentIntCardComponent;
  let fixture: ComponentFixture<StudentIntCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentIntCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentIntCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

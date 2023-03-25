import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInterviewsComponent } from './student-interviews.component';
import { AppModule } from 'src/app/app.module';

describe('StudentInterviewsComponent', () => {
  let component: StudentInterviewsComponent;
  let fixture: ComponentFixture<StudentInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
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

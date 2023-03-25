import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { StudentIntCardComponent } from './student-int-card.component';

describe('StudentIntCardComponent', () => {
  let component: StudentIntCardComponent;
  let fixture: ComponentFixture<StudentIntCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
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

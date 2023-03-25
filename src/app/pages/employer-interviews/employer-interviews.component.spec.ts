import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerInterviewsComponent } from './employer-interviews.component';
import { AppModule } from 'src/app/app.module';

describe('EmployerInterviewsComponent', () => {
  let component: EmployerInterviewsComponent;
  let fixture: ComponentFixture<EmployerInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [ EmployerInterviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerFormComponent } from './employer-form.component';
import { AppModule } from 'src/app/app.module';

describe('EmployerFormComponent', () => {
  let component: EmployerFormComponent;
  let fixture: ComponentFixture<EmployerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [ EmployerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

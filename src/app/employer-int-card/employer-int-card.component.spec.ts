import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerIntCardComponent } from './employer-int-card.component';
import { AppModule } from 'src/app/app.module';

describe('EmployerIntCardComponent', () => {
  let component: EmployerIntCardComponent;
  let fixture: ComponentFixture<EmployerIntCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ EmployerIntCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerIntCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

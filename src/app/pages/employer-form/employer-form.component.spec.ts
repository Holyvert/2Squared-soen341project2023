import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerFormComponent } from './employer-form.component';

describe('EmployerFormComponent', () => {
  let component: EmployerFormComponent;
  let fixture: ComponentFixture<EmployerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

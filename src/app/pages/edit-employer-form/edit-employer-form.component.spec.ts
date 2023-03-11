import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployerFormComponent } from './edit-employer-form.component';

describe('EditEmployerFormComponent', () => {
  let component: EditEmployerFormComponent;
  let fixture: ComponentFixture<EditEmployerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

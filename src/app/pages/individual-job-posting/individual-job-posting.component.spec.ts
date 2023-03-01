import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualJobPostingComponent } from './individual-job-posting.component';

describe('IndividualJobPostingComponent', () => {
  let component: IndividualJobPostingComponent;
  let fixture: ComponentFixture<IndividualJobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualJobPostingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

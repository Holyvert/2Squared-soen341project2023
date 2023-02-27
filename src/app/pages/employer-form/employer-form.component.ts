import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss']
})
export class EmployerFormComponent {

  employerForm!: FormGroup;

  constructor(
    private form_builder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.employerForm = this.form_builder.group({
      job_title: ['', [Validators.required]],
      job_location: ['', [Validators.required]],
      job_location_type: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      job_description: ['', [Validators.required]],
    });
  }

  onSubmit() {
  }
   
}

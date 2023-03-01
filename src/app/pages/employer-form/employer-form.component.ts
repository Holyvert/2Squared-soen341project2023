import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss']
})
export class EmployerFormComponent {
  employerForm!: FormGroup;
 
  

  constructor(
    private form_builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employerForm = this.form_builder.group({
      job_title: ['', [Validators.required]],
      job_location: ['', [Validators.required]],
      job_location_type: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      supervisor: ['', [Validators.required]],
      job_description: ['', [Validators.required]],
      job_requirements: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      docs_required: ['', [Validators.required]],
      application_method: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      jc_first_name: ['', [Validators.required]],
      jc_last_name: ['', [Validators.required]],
      website: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
    });
  }

  onSubmit() {
   
    console.log(this.employerForm.value);
    /*if (this.employerForm.invalid) {
      this.sendNotification('make sure to answer all required fields');
      return;
    }*/
  }

  


} //end of EmployerFormComponent

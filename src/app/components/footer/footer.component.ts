import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { StorageService } from 'src/app/services/storage.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      this.storageService.sendNotification(
        'make sure to answer all required fields'
      );
      return;
    }
    this.submitted = true;
  }
}

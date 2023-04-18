import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Database, set, ref } from '@angular/fire/database';
import { Router } from '@angular/router';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;
  Uploading = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private database: Database,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      ConfirmEmail: ['', [Validators.required, Validators.email]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Authority: ['', [Validators.required]],
    });
  }

  passwordConfirmationValidator(form: FormGroup) {
    const password = form.get('Password')!.value;
    const confirm = form.get('ConfirmPassword')!.value;

    if (password !== confirm) {
      form.controls['ConfirmPassword'].setErrors({ incorrect: true });
    } else {
      form.controls['ConfirmPassword'].setErrors(null);
    }
    return password === confirm ? null : 'The passwords are not the same';
  }

  emailConfirmationValidator(form: FormGroup) {
    const email = form.get('Email')!.value;
    const confirm = form.get('ConfirmEmail')!.value;

    if (email !== confirm) {
      form.controls['ConfirmEmail'].setErrors({ incorrect: true });
    } else {
      form.controls['ConfirmEmail'].setErrors(null);
    }
    return email === confirm ? null : 'The emails are not the same';
  }

  async onSubmit() {
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      this.storageService.sendNotification(
        'make sure to answer all required fields'
      );

      return;
    }
    this.Uploading = true;
    let authority = this.registerForm.value.Authority;
    let path = '';
    if (authority == 'Student') {
      path = 'students/';
    } else if (authority == 'Employer') {
      path = 'employers/';
    }
    let rid: string = '';

    rid = await this.authService.SignUp(
      this.registerForm.value.Email,
      this.registerForm.value.Password,
      authority
    );
    if (rid == '') {
      this.Uploading = false;
      return;
    }
    await this.registerUser(this.registerForm.value, rid, path);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.router.navigate(['/profile', rid, authority]);
    this.Uploading = false;
  }

  async registerUser(value: any, id: string, path: string) {
    if (path == 'students/') {
      set(ref(this.database, path + id), {
        FirstName: value.FirstName,
        LastName: value.LastName,
        PhoneNumber: '',
        Email: value.Email,
        Language: '',
        Program: '',
        Description: '',
        CV: '',
        CVName: '',
        JobsApplied: '', // list vof ids
        SelectedInterviews: '',
        ID: id,
        Favorites: '',
      });
    } else if (path == 'employers/') {
      set(ref(this.database, path + id), {
        ID: id,
        Company: '',
        FirstName: value.FirstName,
        LastName: value.LastName,
        Email: value.Email,
        Language: '',
      });
    }

    this.storageService.sendNotification(
      'user created! Make sure to add information to your profile'
    );
  }
}

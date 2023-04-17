import { Component} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import AOS from 'aos';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  Database,
  ref,
  update,
  onValue,
  get,
  child,
  remove,
} from '@angular/fire/database';
import {
  Storage,
  ref as ref_storage,
  deleteObject,
} from '@angular/fire/storage';
import { Employer, StudentProfile } from 'src/app/models/user.models';
import { StorageService } from 'src/app/services/storage.service';
import {
  faDownload,
  faFilePdf,
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  registerForm!: FormGroup;
  registerFormEmployer!: FormGroup;
  faFilePdf = faFilePdf;
  faFilePowerpoint = faFilePowerpoint;
  faDownload = faDownload;
  matcher = new MyErrorStateMatcher();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  submitted = false;
  canEdit: boolean = false;
  Uploading = false;
  public file: any = {};
  myStudent = {} as StudentProfile;
  myEmployer = {} as Employer;
  path!: string;
  myUser: any = {};
  isStudent: boolean = false;
  isEmployer: boolean = false;
  registerid!: any;
  canCancel: boolean = true;

  constructor(
    public database: Database,
    public storage: Storage,
    public storageService: StorageService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    private Acrouter: ActivatedRoute
  ) {}

  ngOnInit(): void {

        this.registerid = this.Acrouter.snapshot.params['id'];
        let type = this.Acrouter.snapshot.params['type'];
 
      
    //example using a hard coded id (reading user profile)
    this.myUser = this.authService.getUser();
       if (this.registerid != undefined) {
        this.myUser.uid = this.registerid
        this.myUser.photoURL= type
        this.canEdit=true
        this.canCancel =false
       }
    if (this.myUser) {
      if (this.myUser.photoURL == 'Student') {
        this.path = 'students/' + this.myUser.uid;
        this.isStudent = true;
      } else if (this.myUser.photoURL == 'Employer') {
        this.path = 'employers/' + this.myUser.uid;
        this.isEmployer = true;
      }

      const dbRef = ref(this.database);
      const userRef = child(dbRef, this.path);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (this.myUser.photoURL == 'Student') {
          this.myStudent = data;
        } else if (this.myUser.photoURL == 'Employer') {
          this.myEmployer = data;
        }
      });

      this.registerForm = this.formBuilder.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        tel: [
          '',
          [Validators.required, Validators.pattern('[- +()0-9]{8,12}')],
        ],
        language: ['', [Validators.required]],
        personal_description: ['', [Validators.required]],
        program: ['', [Validators.required]],
        CV: [null, [Validators.required]],
      });

      this.registerFormEmployer = this.formBuilder.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        language: ['', [Validators.required]],
        company: ['', [Validators.required]],
      });
    }

    AOS.init();
  }

  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }

  async onSubmit() {
    if (this.isStudent) {
      if (this.registerForm.invalid) {
        this.sendNotification('make sure to answer all required fields');
        return;
      }

      this.EnableForm();

      this.Uploading = true;

      if (this.myStudent.CV != null || this.myStudent.CV != '') {
        //detete old CV from storage
        let path = 'curriculum_vitae/' + this.myStudent.CVName;
        const fileRef = ref_storage(this.storage, path);
        deleteObject(fileRef)
          .then(() => {})
          .catch((error) => {});
      }

      let result = await this.storageService.uploadToFirestore(
        this.file,
        'curriculum_vitae/',
        this.storage
      );
      let myValues = result.split(',');
      let myDownloadLink = myValues[0];
      let myFileName = myValues[1] + this.file.name;

      this.onEditUser(
        this.myUser.uid,
        this.registerForm.value,
        myDownloadLink,
        myFileName
      );
      this.Uploading = false;
    } else if (this.isEmployer) {
      if (this.registerFormEmployer.invalid) {
        this.sendNotification('make sure to answer all required fields');
        return;
      }

      this.EnableForm();

      this.Uploading = true;
      this.onEditUser(this.myUser.uid, this.registerFormEmployer.value);
      this.Uploading = false;
    }
  }

  readUser(value: any) {
    const dbRef = ref(this.database);
    get(child(dbRef, `students/${value}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  onEditUser(
    index: any,
    value: any,
    myDownloadLink?: string,
    myFileName?: string
  ) {
    const dbRef = ref(this.database);
    if (this.isStudent) {
      update(child(dbRef, `students/${index}`), {
        FirstName: value.first_name,
        LastName: value.last_name,
        PhoneNumber: value.tel,
        Language: value.language,
        Program: value.program,
        Description: value.personal_description,
        CV: myDownloadLink,
        CVName: myFileName,
      });
    } else if (this.isEmployer) {
      update(child(dbRef, `employers/${index}`), {
        FirstName: value.first_name,
        LastName: value.last_name,
        Language: value.language,
        Company: value.company,
      });
    }

    this.sendNotification(
      `user ${value.first_name} ${value.last_name} was updated!`
    );
  }

  onDeleteUser(index: any) {
    const dbRef = ref(this.database);
    remove(child(dbRef, `students/${index}`));
    this.sendNotification(`user ${index} was deleted!`);
  }

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  EnableForm() {
    this.canEdit = !this.canEdit;
    this.canCancel=true
  }
}

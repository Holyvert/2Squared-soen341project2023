import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Database,set,ref,update, onValue, get, child, remove} from '@angular/fire/database'
import { Storage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Employer, JobPost } from 'src/app/models/user.models';
import { faDownload, faFilePdf, faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss'],
})
export class EmployerFormComponent {
  employerForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  canEdit: Boolean = false;
  faFilePdf = faFilePdf;
  faFilePowerpoint = faFilePowerpoint;
  faDownload = faDownload;
  Uploading = false;
  myUser: any = {};
  myEmployer = {} as Employer;
  public file: any = {};

  constructor(
    private form_builder: FormBuilder,
    public database: Database,
    public storage: Storage,
    public storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    if (this.myUser.photoURL == 'Student') {
      this.router.navigate([''])
    }

    const dbRef = ref(this.database);
    const userRef = child(dbRef, 'employers/' + this.myUser.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
        this.myEmployer = data;
        console.log(this.myEmployer.Company);
    });

    this.employerForm = this.form_builder.group({
      JobTitle: ['', [Validators.required]],
      JobLocation: ['', [Validators.required]],
      JobLocationType: ['', [Validators.required]],
      Salary: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
      Supervisor: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Requirements: ['', [Validators.required]],
      Deadline: ['', [Validators.required]],
      DocsRequired: ['', [Validators.required]],
      ApplicationMethod: ['', [Validators.required]],
      JcFirstName: ['', [Validators.required]],
      JcLastName: ['', [Validators.required]],
      Website: ['', [Validators.required]],
      Image: [null, [Validators.required]],
      City: ['', [Validators.required]],
      Province: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
    });
  }
  async onSubmit() {

    if (this.employerForm.invalid) {
      this.sendNotification('make sure to answer all required fields');
      return;
    }
    this.Uploading = true;
    var myDownloadLink = await this.storageService.uploadToFirestore(
      this.file,
      'images/',
      this.storage
    );
    await this.registerJobPosting(this.employerForm.value, myDownloadLink);
    this.Uploading = false;
    // Navigate to the home page (can be changed to a different page)
    this.router.navigate(['']);
  }

  async registerJobPosting(value: any, myDownloadLink: string) {
    var myId = await this.storageService.IDgenerator('job-postings/', this.database)
    set(ref(this.database, 'job-postings/' + myId), {
      JobTitle: value.JobTitle,
      JobLocation: value.JobLocation,
      JobLocationType: value.JobLocationType,
      Salary: value.Salary,
      Duration: value.Duration,
      Supervisor: value.Supervisor,
      Description: value.Description,
      Requirements: value.Requirements,
      Deadline: JSON.stringify(value.Deadline).substring(1,11),
      DocsRequired: value.DocsRequired,
      ApplicationMethod: value.ApplicationMethod,
      Company: this.myEmployer.Company,
      Email: this.myEmployer.Email,
      JcFirstName: value.JcFirstName,
      JcLastName: value.JcLastName,
      Website: value.Website,
      City: value.City,
      Province: value.Province,
      PostalCode: value.PostalCode,
      Image: myDownloadLink,
    });
    this.Uploading = false;
    this.sendNotification('Job Created');
  }

  //error with send notification function, probably positions?
  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }
  EnableForm() {
    this.canEdit = !this.canEdit;
  }
}//end of EmployerFormComponent

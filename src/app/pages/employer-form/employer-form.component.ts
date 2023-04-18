import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Database, set, ref, onValue, child } from '@angular/fire/database';
import { Storage } from '@angular/fire/storage';
import { Employer } from 'src/app/models/user.models';
import {
  faDownload,
  faFilePdf,
  faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';
import { ErrorStateMatcher } from '@angular/material/core';

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
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss'],
})
export class EmployerFormComponent {
  employerForm!: FormGroup;
  canEdit: boolean = false;
  faFilePdf = faFilePdf;
  faFilePowerpoint = faFilePowerpoint;
  faDownload = faDownload;
  Uploading = false;
  myUser: any = {};
  myEmployer = {} as Employer;
  public file: any = {};
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    public database: Database,
    public storage: Storage,
    public storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    if (this.myUser) {
      if (this.myUser.photoURL == 'Student') {
        this.router.navigate(['']);
      }

      const dbRef = ref(this.database);
      const userRef = child(dbRef, 'employers/' + this.myUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        this.myEmployer = data;
      });

      this.employerForm = this.formBuilder.group({
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
  }
  async onSubmit() {
    if (this.employerForm.invalid) {
      this.storageService.sendNotification(
        'make sure to answer all required fields'
      );
      return;
    }
    this.Uploading = true;
    let result = await this.storageService.uploadToFirestore(
      this.file,
      'images/',
      this.storage
    );
    let myValues = result.split(',');
    let myDownloadLink = myValues[0];
    await this.registerJobPosting(this.employerForm.value, myDownloadLink);
    this.Uploading = false;
    // Navigate to the home page (can be changed to a different page)
    this.router.navigate(['']);
  }

  async registerJobPosting(value: any, myDownloadLink: string) {
    let myId = await this.storageService.IDgenerator(
      'job-postings/',
      this.database
    );
    set(ref(this.database, 'job-postings/' + myId), {
      JobTitle: value.JobTitle,
      JobLocation: value.JobLocation,
      JobLocationType: value.JobLocationType,
      Salary: value.Salary,
      Duration: value.Duration,
      Supervisor: value.Supervisor,
      Description: value.Description,
      Requirements: value.Requirements,
      Deadline: JSON.stringify(value.Deadline).substring(1, 11),
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
      EmployerID: this.myEmployer.ID,
      ID: myId,
      Candidates: '',
      SelectedInterviews: '',
    });
    this.Uploading = false;
    this.storageService.sendNotification('Job Created');
  }

  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }
  EnableForm() {
    this.canEdit = !this.canEdit;
  }
} //end of EmployerFormComponent

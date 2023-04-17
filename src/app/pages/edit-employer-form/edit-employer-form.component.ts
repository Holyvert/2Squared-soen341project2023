import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import AOS from 'aos';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  Database,
  ref,
  update,
  onValue,
  child,
} from '@angular/fire/database';
import { Employer, JobPost } from 'src/app/models/user.models';
import { StorageService } from 'src/app/services/storage.service';
import {
  Storage,
} from '@angular/fire/storage';

@Component({
  selector: 'app-edit-employer-form',
  templateUrl: './edit-employer-form.component.html',
  styleUrls: ['./edit-employer-form.component.scss'],
})
export class EditEmployerFormComponent {
  employerForm!: FormGroup;
  canEdit: boolean = false;
  jobPost = {} as JobPost;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Uploading = false;
  public file: any = {};
  myUser: any = {};
  myEmployer = {} as Employer;
  index!: any;
  posting!: ParamMap;

  constructor(
    private form_builder: FormBuilder,
    public database: Database,
    public storage: Storage,
    private snackBar: MatSnackBar,
    public storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private Acrouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    this.index = this.Acrouter.snapshot.params['id'];
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

      const studentRef = child(dbRef, `job-postings/${this.index}`);
      onValue(studentRef, (snapshot) => {
        const data = snapshot.val();
        this.jobPost = data;
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
        Company: ['', [Validators.required]],
        Image: [null, [Validators.required]],
        City: ['', [Validators.required]],
        Province: ['', [Validators.required]],
        PostalCode: ['', [Validators.required]],
      });

      AOS.init();
    }
  }

  async onSubmit() {

    this.EnableForm();
    this.Uploading = true;
    if (this.file.name == undefined) {
      
      const dbRef = ref(this.database);
      const userRef = child(dbRef, `job-postings/${this.index}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        this.onEditPost(this.index, this.employerForm.value, data.Image);
      });
      this.Uploading = false;
    } else {
      let result = await this.storageService.uploadToFirestore(
        this.file,
        'images/',
        this.storage
      );

      let myValues = result.split(',');
      let myDownloadLink = myValues[0];

      this.onEditPost(this.index, this.employerForm.value, myDownloadLink);
      this.Uploading = false;
    }
  }

  EnableForm() {
    this.canEdit = !this.canEdit;
  }

  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  onEditPost(index: any, value: any, myDownloadLink: string) {
    const dbRef = ref(this.database);
    update(child(dbRef, `job-postings/${index}`), {
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
      JcFirstName: value.JcFirstName,
      JcLastName: value.JcLastName,
      Website: value.Website,
      City: value.City,
      Province: value.Province,
      PostalCode: value.PostalCode,
      Image: myDownloadLink,
    });
    this.sendNotification(`Post ${value.JobTitle} was updated!`);
  }
} //end of EmployerFormComponent

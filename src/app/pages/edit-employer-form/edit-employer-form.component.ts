import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import AOS from 'aos';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Database,set,ref,update, onValue, get, child, remove} from '@angular/fire/database'
import { Employer, JobPost } from 'src/app/models/user.models';
import { StorageService } from 'src/app/services/storage.service';
import { Storage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-employer-form',
  templateUrl: './edit-employer-form.component.html',
  styleUrls: ['./edit-employer-form.component.scss']
})

export class EditEmployerFormComponent {
  employerForm!: FormGroup;
  canEdit: Boolean = false;
  jobPost = {} as JobPost;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Uploading = false;
  public file: any = {};
  myUser: any = {};
  myEmployer = {} as Employer;
  index!: any;

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
    this.index= this.Acrouter.snapshot.fragment;
    if (this.myUser){
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
  
    // example using a hard coded id (reading user profile)
    console.log("INDEX:" + this.index)
    const studentRef = child(dbRef, `job-postings/${this.index}`);
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
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
    // console.log(this.employerForm.value);
    // if (this.employerForm.invalid) {
    //   this.sendNotification('make sure to answer all required fields');
    //   return;
    // }

    this.EnableForm();
    this.Uploading = true;
    var result = await this.storageService.uploadToFirestore(
      this.file,
      'images/',
      this.storage
    );

    var myValues = result.split(',');
    var myDownloadLink = myValues[0];

    this.onEditPost(this.index, this.employerForm.value, myDownloadLink);
    this.Uploading = false;
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
      Deadline: JSON.stringify(value.Deadline).substring(1,11),
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
    this.sendNotification(`post ${index} was updated!`);
  }

} //end of EmployerFormComponent


import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import AOS from 'aos';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Database,set,ref,update, onValue, get, child, remove} from '@angular/fire/database'
import { JobPost } from 'src/app/models/user.models';
import { StorageService } from 'src/app/services/storage.service';
import { Storage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-employer-form',
  templateUrl: './edit-employer-form.component.html',
  styleUrls: ['./edit-employer-form.component.scss']
})

export class EditEmployerFormComponent {
  employerForm!: FormGroup;
  canEdit: Boolean = false;
  defaultJobPost = {} as JobPost;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  Uploading = false;
  public file: any = {};


  constructor(
    private form_builder: FormBuilder,
    public database: Database,
    public storage: Storage,
    private snackBar: MatSnackBar,
    public storageService: StorageService,
  ) {}

  ngOnInit(): void {
        // example using a hard coded id (reading user profile)
        const dbRef = ref(this.database);
        const studentRef = child(dbRef, 'job-postings/20');
        onValue(studentRef, (snapshot) => {
          const data = snapshot.val();
          const keys = Object.keys(data);
          const values = Object.values(data);
          console.log(data);
          console.log(keys);
          console.log(values);
          this.defaultJobPost = data;
        });

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

    AOS.init();

  }

  async onSubmit() {
    // console.log(this.employerForm.value);
    // if (this.employerForm.invalid) {
    //   this.sendNotification('make sure to answer all required fields');
    //   return;
    // }

    this.EnableForm();
    this.Uploading = true;
    var myDownloadLink = await this.storageService.uploadToFirestore(
      this.file,
      'images/',
      this.storage
    );

    this.onEditPost(20, this.employerForm.value, myDownloadLink);
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
      Company: value.organization,
      Description: value.job_description,
      Duration: value.duration,
      Image: myDownloadLink,
      JobLocation: value.job_location,
      JobLocationType: value.job_location_type,
      JobTitle: value.job_title,
      Salary:value.salary,
      Supervisor: value.supervisor,  
    });
    this.sendNotification(`post ${index} was updated!`);
  }

} //end of EmployerFormComponent


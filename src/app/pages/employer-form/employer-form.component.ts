import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {Database,set,ref,update, onValue, get, child, remove} from '@angular/fire/database'
import { Storage, ref as ref_storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Employer, JobPost } from 'src/app/models/user.models';
import { faDownload, faFilePdf, faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.scss']
})
export class EmployerFormComponent {
  employerForm!: FormGroup;
  horizontalPosition: any;
  snackBar: any;
  verticalPosition: any;
  canEdit: Boolean = false;
  faFilePdf = faFilePdf;
  faFilePowerpoint = faFilePowerpoint;
  faDownload = faDownload;
  Uploading = false;
 public file: any = {};
  

  constructor(
    private form_builder: FormBuilder,
    public database: Database,
    public storage: Storage,
    public storageService: StorageService
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
      // address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
    });
  }
async onSubmit() {
   
    // console.log(this.employerForm.value);
   
    /*if (this.employerForm.invalid) {
      this.sendNotification('make sure to answer all required fields');
      return;
    }*/
    this.Uploading = true;
    var myDownloadLink = await this.storageService.uploadToFirestore(
      this.file,
      'images/',
      this.storage
    );
    this.registerJobPosting(this.employerForm.value,myDownloadLink);
    this.Uploading = false;
  }
  registerJobPosting(value: any, myDownloadLink: string) {
    set(ref(this.database, 'job-postings/' + Math.floor(Math.random() * 100)), {
      job_title:value.job_title,
      job_location:value.job_location,
      job_location_type:value.job_location_type,
      salary:value.salary,
      duration:value.duration,
      supervisor:value.supervisor,  
      job_description:value.job_description,
      job_requirements:value.job_requirements,
      deadline:value.deadline,
      docs_required:value.docs_required,
      application_method:value.application_method,
      organization:value.organization,
      jc_first_name:value.jc_first_name,
      jc_last_name:value.jc_last_name,
      website:value.website,
      // address:value.address,
      city:value.city,
      province: value.province,
      postal_code:value.postal_code,
      image:myDownloadLink,
    });
    alert("Job Created")
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

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
      JobTitle:['', [Validators.required]],
      JobLocation:['', [Validators.required]],
      JobLocationType:['', [Validators.required]],
      Salary:['', [Validators.required]],
      Duration:['', [Validators.required]],
      Supervisor:['', [Validators.required]],
      Description:['', [Validators.required]],
      JobRequirements:['', [Validators.required]],
      Deadline:['', [Validators.required]],
      DocsRequired:['', [Validators.required]],
      ApplicationMethod:['', [Validators.required]],
      Company:['', [Validators.required]],
      JCFirstName:['', [Validators.required]],
      JCLastName:['', [Validators.required]],
      Website:['', [Validators.required]],
      // address:value.address,
      City:['', [Validators.required]],
      Province: ['', [Validators.required]],
      PostalCode:['', [Validators.required]],
    
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
      JobTitle:value.JobTitle,
      JobLocation:value.JobLocation,
      JobLocationType:value.JobLocationType,
      Salary:value.Salary,
      Duration:value.Duration,
      Supervisor:value.Supervisor,  
      Description:value.JobDescription,
      JobRequirements:value.JobRequirements,
      Deadline:value.Deadline,
      DocsRequired:value.DocsRequired,
      ApplicationMethod:value.ApplicationMethod,
      Company:value.Organization,
      JCFirstName:value.jc_first_name,
      JCLastName:value.jc_last_name,
      website:value.website,
      // address:value.address,
      city:value.city,
      province: value.province,
      postal_code:value.postal_code,
      Image:myDownloadLink,
    });
    alert("Job Created")
  }

  //error with send notification function, probably positions?
  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      Duration: 3000,
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

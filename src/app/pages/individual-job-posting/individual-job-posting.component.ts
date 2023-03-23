import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Database, ref, child, remove } from '@angular/fire/database';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-individual-job-posting',
  templateUrl: './individual-job-posting.component.html',
  styleUrls: ['./individual-job-posting.component.scss'],
})
export class IndividualJobPostingComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  posting!: ParamMap;
  authority!: string;
  myUser!: any;
  index!: any;
  isEmployerWhoPosted: boolean = false;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public database: Database
  ) {}

  ngOnInit() {
    this.posting = this.Acrouter.snapshot.queryParamMap;
    this.myUser = this.authService.getUser();
    //this.authority = this.myUser.photoURL;
    this.index = this.Acrouter.snapshot.fragment;

    if (this.myUser && this.posting) {
      console.log(this.Acrouter.snapshot.queryParamMap);
      if (this.myUser.uid == this.posting.get('EmployerID'))
        this.isEmployerWhoPosted = true;
    }
  }

  onDeleteJobPosting() {
    if (this.myUser) {
      const index = this.Acrouter.snapshot.fragment;
      const dbRef = ref(this.database);

      remove(child(dbRef, `job-postings/${index}`));
      this.sendNotification(`user ${index} was deleted!`);
      this.router.navigate(['']);
    }
  }

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Send to candidates page
  seeCandidates() {
    if (this.myUser) {
      this.posting = this.Acrouter.snapshot.queryParamMap;
    }
  }

}

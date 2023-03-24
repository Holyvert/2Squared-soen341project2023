import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Database, ref, child, remove, onValue } from '@angular/fire/database';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JobPost } from 'src/app/models/user.models';

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
  isEmployerWhoPosted: boolean = false;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public database: Database
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    this.posting = this.Acrouter.snapshot.queryParamMap;
    if (this.myUser && this.posting) {
      if (this.myUser.photoURL == 'Student') {
        this.authority = 'Student';
      } else if (this.myUser.photoURL == 'Employer') {
        this.authority = 'Employer';
        if (this.myUser.uid == this.posting.get('EmployerID')) {
          console.log(this.posting.keys);
          this.isEmployerWhoPosted = true;
        }
      }
    }
  }

  onDeleteJobPosting() {
    if (this.myUser) {
      const dbRef = ref(this.database);

      remove(child(dbRef, `job-postings/${this.posting.get('ID')}`));
      this.sendNotification(
        `Posting ${this.posting.get('JobTitle')} was deleted!`
      );
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
  addToFavorites()  {
    
  }
}

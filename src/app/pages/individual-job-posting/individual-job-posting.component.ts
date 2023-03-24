import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Database,
  ref,
  child,
  remove,
  onValue,
  update
} from '@angular/fire/database';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { JobPost } from 'src/app/models/user.models';
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
  isEmployerWhoPosted: boolean = false;
  Applied: Boolean = false;

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

    const dbRef = ref(this.database);
    const starCountRef = child(
      dbRef,
      `job-postings/${this.posting.get('ID')}/Candidates`
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      console.log('keys: ' + keys);
      if (keys.includes(this.myUser.uid)) {
        this.Applied = true;
      }
    });
    console.log('Applied : ' + this.Applied);
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

  //will perform to backend for when apply button is clicked
  applyAftermath() {
    const firebase = this.database;
    const dbRef = ref(this.database);
    var id = this.myUser.uid;
    if (this.myUser) {
      const starCountRef = child(
        dbRef,
        `job-postings/${this.posting.get('ID')}/Candidates`
      );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        console.log('keys: ' + keys);
        if (!keys.includes(this.myUser.uid)) {
          //send user id to job posting in candidates attribute
          var id1 = this.myUser.uid;
          const dbRef = ref(this.database);
          const userRef1 = child(
            dbRef,
            `job-postings/${this.posting.get('ID')}/Candidates`
          );
          update(userRef1, { [id1]: '' });

          //send job posting to user student in appliedto attribute
          var id2 = this.posting.get('ID') as string;
          const userRef2 = child(
            dbRef,
            `students/${this.myUser.uid}/JobsApplied`
          );
          update(userRef2, { [id2]: '' });
        }
      });
    }
  }
}
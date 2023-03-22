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
  myUser: any;
  isEmployerWhoPosted: boolean = false;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public database: Database
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    this.posting = this.Acrouter.snapshot.queryParamMap;
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
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Database,
  ref,
  child,
  remove,
} from '@angular/fire/database';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-individual-job-posting',
  templateUrl: './individual-job-posting.component.html',
  styleUrls: ['./individual-job-posting.component.scss'],
})

export class IndividualJobPostingComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  posting!: ParamMap;


  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public database: Database
    ) {}

  ngOnInit() {
    this.posting = this.Acrouter.snapshot.queryParamMap;
    console.log(this.Acrouter.snapshot.queryParamMap);
  }
  onDeleteJobPosting() {
    const index=this.Acrouter.snapshot.fragment;
    const dbRef = ref(this.database);
    remove(child(dbRef, `job-postings/${index}`));
    alert(`user ${index} was deleted!`);
    this.router.navigateByUrl("");
    // this.router.navigateByUrl(this.router.getLastSuccessfulNavigation().previousNavigation);
  }

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}

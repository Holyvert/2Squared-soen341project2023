import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import {
  Database,
  ref,
  onValue,
  child,
  update,
  remove,
} from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit, AfterContentChecked {
  posting: any;
  myStudent: any;
  SomeoneHere = true;
  Uploading = false;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    public database: Database,
    public authService: AuthService,
    private storageService: StorageService
  ) {}

  @Input() student: any;
  @Input() job: any;

  ngOnInit() {
    this.myStudent = [];
    this.posting = [];

    if (this.job && this.job[0]) {
      this.posting = this.job[0];
    }
    if (this.student && this.student[0]) {
      this.myStudent = this.student[0];
    }

    this.SomeoneHere = true;
  }

  ngAfterContentChecked() {
    if (this.myStudent) {
      if (this.myStudent.length == 0) {
        this.SomeoneHere = false;
      } else {
        this.SomeoneHere = true;
      }
    }
  }

  selectForInterview(studentID: any) {
    this.Uploading = true;
    let keys: any;
    const dbRef = ref(this.database);
    const starCountRef = child(
      dbRef,
      `students/${studentID}/SelectedInterviews`
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (!keys.includes(this.posting.ID) || !keys) {
      const userRef = child(dbRef, `students/${studentID}/SelectedInterviews`);
      update(userRef, { [this.posting.ID]: '' });
    }

    const starCountRef2 = child(
      dbRef,
      `job-postings/${this.posting.ID}/SelectedInterviews`
    );
    onValue(starCountRef2, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (!keys.includes(this.posting.ID) || !keys) {
      const userRef = child(
        dbRef,
        `job-postings/${this.posting.ID}/SelectedInterviews`
      );
      update(userRef, { [studentID]: '' });
    }

    const starCountRef3 = child(dbRef, `students/${studentID}/JobsApplied`);
    onValue(starCountRef3, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (keys.length == 1) {
      //need to fix
      const userRef = child(dbRef, `students/${studentID}`);
      update(userRef, { JobsApplied: '' });
      remove(
        child(dbRef, `students/${studentID}/JobsApplied/${this.posting.ID}`)
      );
    } else if (keys.includes(this.posting.ID)) {
      remove(
        child(dbRef, `students/${studentID}/JobsApplied/${this.posting.ID}`)
      );
    }

    const starCountRef4 = child(
      dbRef,
      `job-postings/${this.posting.ID}/Candidates`
    );
    onValue(starCountRef4, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (keys.length == 1) {
      //need to fix
      const userRef = child(dbRef, `job-postings/${this.posting.ID}`);
      update(userRef, { Candidates: '' });
      remove(
        child(dbRef, `job-postings/${this.posting.ID}/Candidates/${studentID}`)
      );
    } else if (keys.includes(studentID)) {
      remove(
        child(dbRef, `job-postings/${this.posting.ID}/Candidates/${studentID}`)
      );
    }

    this.storageService.sendNotification(
      'Student has been selected for interview.'
    );
    this.Uploading = false;
    window.location.reload();
  }
}

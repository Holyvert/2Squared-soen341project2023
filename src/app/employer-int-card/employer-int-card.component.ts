import { Component } from '@angular/core';
import {
  Database,
  child,
  onValue,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { JobPost } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employer-int-card',
  templateUrl: './employer-int-card.component.html',
  styleUrls: ['./employer-int-card.component.scss'],
})
export class EmployerIntCardComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  faDownload = faDownload;
  myUser: any = {};
  jobsArray = [{} as JobPost];
  myEmployerPostingsIDs: any = [];
  myKeysArray: any = [];
  myStudentArray: any = [];
  //create an array of numbers
  numberOfStudentsArray: any = [];
  Uploading = false;
  limitArray: any = [0];

  constructor(
    private database: Database,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.jobsArray = [];
    this.myKeysArray = [];
    this.myStudentArray = [];
    this.myEmployerPostingsIDs = [];
    this.myUser = this.authService.getUser();

    if (this.myUser) {
      const dbRef = ref(this.database);
      const starCountRef = child(dbRef, `job-postings/`);
      onValue(starCountRef, async (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);

        keys.forEach((element) => {
          const starCountRef = child(dbRef, `job-postings/${element}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data.EmployerID == this.myUser.uid) {
              this.myEmployerPostingsIDs.push(element);
            }
          });
        });

        this.myEmployerPostingsIDs.forEach((element: any) => {
          const starCountRef = child(dbRef, `job-postings/${element}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data.SelectedInterviews);
            this.myKeysArray.push(keys);
            this.jobsArray.push(data);
            console.log(this.myKeysArray);
            console.log(this.jobsArray);
            var length = keys.length;
            this.numberOfStudentsArray.push(length);
          });
          console.log(this.numberOfStudentsArray);
        });

        if (this.numberOfStudentsArray.length > 1) {
          for (let i = 0; i < this.numberOfStudentsArray.length; i++) {
            this.limitArray.push(
              this.limitArray[i] + this.numberOfStudentsArray[i]
            );
          }
        }
        console.log(this.limitArray);
        console.log(this.myKeysArray);

        for (let i = 0; i < this.myKeysArray.length; i++) {
          const promiseArray: Promise<any>[] = [];

          this.myKeysArray[i].forEach((key: any) => {
            const starCountRef = child(dbRef, `students/${key}`);
            const promise = new Promise((resolve) => {
              onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                resolve(data);
              });
            });
            promiseArray.push(promise);
          });

          const dataArray = await Promise.all(promiseArray);
          this.myStudentArray.push(dataArray);
        }

        console.log(this.myStudentArray);
      });
    }
  }

  unselectForInterview(postingID: any, studentID: any) {
    this.Uploading = true;
    var keys: any;
    const dbRef = ref(this.database);
    const starCountRef = child(dbRef, `students/${studentID}/JobsApplied`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (!keys.includes(postingID as any) || !keys) {
      const userRef = child(dbRef, `students/${studentID}/JobsApplied`);
      update(userRef, { [postingID]: '' });
    }

    const starCountRef2 = child(dbRef, `job-postings/${postingID}/Candidates`);
    onValue(starCountRef2, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (!keys.includes(studentID as any) || !keys) {
      const userRef = child(dbRef, `job-postings/${postingID}/Candidates`);
      update(userRef, { [studentID]: '' });
    }

    const starCountRef3 = child(
      dbRef,
      `students/${studentID}/SelectedInterviews`
    );
    onValue(starCountRef3, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (keys.length == 1) {
      const userRef = child(dbRef, `students/${studentID}`);
      update(userRef, { SelectedInterviews: '' });
    } else if (keys.includes(postingID as any)) {
      remove(
        child(dbRef, `students/${studentID}/SelectedInterviews/${postingID}`)
      );
    }

    const starCountRef4 = child(
      dbRef,
      `job-postings/${postingID}/SelectedInterviews`
    );
    onValue(starCountRef4, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (keys.length == 1) {
      const userRef = child(dbRef, `job-postings/${postingID}`);
      update(userRef, { SelectedInterviews: '' });
    } else if (keys.includes(studentID as any)) {
      remove(
        child(
          dbRef,
          `job-postings/${postingID}/SelectedInterviews/${studentID}`
        )
      );
    }

    this.sendNotification('Student has been unselected from interview.');
    this.Uploading = false;
    window.location.reload();
  }

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

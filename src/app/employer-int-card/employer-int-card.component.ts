import { Component } from '@angular/core';
import { Database, child, onValue, ref, remove, update } from '@angular/fire/database';
import { JobPost } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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

  constructor(private database: Database, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.jobsArray = [];
    this.myKeysArray = [];
    this.myStudentArray = [];
    this.myUser = this.authService.getUser();

    if(this.myUser){
    const dbRef = ref(this.database);
    const starCountRef = child(dbRef, `job-postings/`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      // console.log("keys: "+ keys)

      keys.forEach((element) => {
        const starCountRef = child(dbRef, `job-postings/${element}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          // console.log('employer id: ' + this.myUser.uid);
          // console.log('employer :' + data.EmployerID);
          if (data.EmployerID == this.myUser.uid) {
            this.myEmployerPostingsIDs.push(element);
            // console.log('myEmployerPostingsIDs: ' + this.myEmployerPostingsIDs);
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
          // console.log("length: "+this.jobsArray.length)
          // console.log(this.jobsArray)
          var length = keys.length;
          this.numberOfStudentsArray.push(length);
        });
      });
      console.log(this.myKeysArray);

      this.myKeysArray.forEach((element: any) => {
        element.forEach((key: any) => {
          const starCountRef = child(dbRef, `students/${key}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            this.myStudentArray.push(data);
            // console.log("length: "+this.jobsArray.length)
            // console.log(this.jobsArray)
          });
        });
      });
      console.log(this.myStudentArray);
      console.log(this.numberOfStudentsArray);
      // const length = Object.keys(this.jobsArray[0].SelectedInterviews).length;
      // console.log(Object.keys(this.jobsArray[0].SelectedInterviews));
      // console.log(length);
    });
  }
  }

  unselectForInterview(postingID: any, studentID: any) {
    console.log(studentID);
    this.Uploading = true;
    var keys: any;
    const dbRef = ref(this.database);
    const starCountRef = child(
      dbRef,
      `students/${studentID}/JobsApplied`
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (!keys.includes(postingID as any) || !keys) {
      const userRef = child(dbRef, `students/${studentID}/JobsApplied`);
      update(userRef, { [postingID]: '' });
    }

    const starCountRef2 = child(
      dbRef,
      `job-postings/${postingID}/Candidates`
    );
    onValue(starCountRef2, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    if (!keys.includes(postingID as any) || !keys) {
      const userRef = child(
        dbRef,
        `job-postings/${postingID}/Candidates`
      );
      update(userRef, { [studentID]: '' });
    }

    const starCountRef3 = child(dbRef, `students/${studentID}/SelectedInterviews`);
    onValue(starCountRef3, (snapshot) => {
      const data = snapshot.val();
      keys = Object.keys(data);
    });
    console.log(keys.length);
    if (keys.length == 1) {
      //need to fix
      const userRef = child(dbRef, `students/${studentID}`);
      update(userRef, { JobsApplied: '' });
      remove(
        child(dbRef, `students/${studentID}/SelectedInterviews/${postingID}`)
      );
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
    console.log(keys.length);
    if (keys.length == 1) {
      //need to fix
      const userRef = child(dbRef, `job-postings/${postingID}`);
      update(userRef, { Candidates: '' });
      remove(
        child(dbRef, `job-postings/${postingID}/SelectedInterviews/${studentID}`)
      );
    } else if (keys.includes(studentID as any)) {
      remove(
        child(dbRef, `job-postings/${postingID}/SelectedInterviews/${studentID}`)
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

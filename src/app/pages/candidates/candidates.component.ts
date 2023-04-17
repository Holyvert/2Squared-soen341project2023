import { Component, OnInit } from '@angular/core';
import { child, Database, onValue, ref } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  posting!: any;
  studentArray!: any;
  jobInfo!: any;
  myUser: any = {};
  constructor(
    private Acrouter: ActivatedRoute,
    public database: Database,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.studentArray = [];
    this.jobInfo = null;
    this.posting = this.Acrouter.snapshot.params['id'];
    const dbRef = ref(this.database);

    //Adding this if-statement to see if it will fix build issue
    //if (this.myUser){
    const starCountRef = child(
      dbRef,
      `job-postings/` + this.posting + '/Candidates'
    );
    const dir_jobPost = child(dbRef, 'job-postings/' + this.posting);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
      const keys = Object.keys(data);
      //Beginning of for-each
      keys.forEach((element) => {
        const starCountRef = child(dbRef, 'students/' + element);

        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          this.studentArray.push(data);
        });
      });
    }
      //end of for-each
    });


    //Added this just now
    onValue(dir_jobPost, (snapshot) => {
      const job_data = snapshot.val();
      this.jobInfo = job_data;
    });
    //}
  }
}

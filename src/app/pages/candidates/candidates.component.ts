import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { Employer, JobPost, StudentProfile } from 'src/app/models/user.models';
import { child, Database, onValue, ref } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
    //this.myUser = this.authService.getUser();
    this.studentArray = [];
    this.jobInfo = null;
    this.posting = this.Acrouter.snapshot.params['id'];
    console.log('the posting', this.posting);
    //console.log("this posting", this.posting);
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
      console.log('data: ', data);
      if(data){
      const keys = Object.keys(data);
      console.log(data);
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
    //console.log("the student array",this.studentArray,);

    //Added this just now
    onValue(dir_jobPost, (snapshot) => {
      const job_data = snapshot.val();
      // const keys = Object.keys(job_data);
      console.log('job-info: ', job_data);
      this.jobInfo = job_data;
    });
    //}
  }
}

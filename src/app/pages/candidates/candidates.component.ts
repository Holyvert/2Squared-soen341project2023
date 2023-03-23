import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { Employer, JobPost, StudentProfile } from 'src/app/models/user.models';
import { child, Database, onValue, ref} from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  posting!: any;
  studentArray! :any
  jobInfo! : any;
  constructor(private Acrouter: ActivatedRoute,public database: Database,){}
  
  ngOnInit() {
    this.studentArray= [];
    this.jobInfo = [];
    this.posting =this.Acrouter.snapshot.fragment;
     //console.log("this posting", this.posting);
    const dbRef = ref(this.database);
    const starCountRef = child(dbRef,`job-postings/`+this.posting+'/StudentListIDs');
    //Trying something
    const trying = child(dbRef, 'job-postings/' + this.posting);
   
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const keys =  Object.keys(data);
    console.log(data);
    //Beginning of for-each
    keys.forEach(element =>{
      const starCountRef = child(dbRef,'students/'+element);

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.studentArray.push(data)})
    });
    //end of for-each
  });
  //console.log("the student array",this.studentArray,);

  //Added this just now
  onValue(trying, (snapshot) => {
    const job_data = snapshot.val();
    const keys = Object.keys(job_data);
    console.log("job-info: ", job_data);
    this.jobInfo.push(job_data);

  });
    

}
}
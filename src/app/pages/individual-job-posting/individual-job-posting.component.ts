//import { onValue } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Database,ref,update, onValue, child} from '@angular/fire/database'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-individual-job-posting',
  templateUrl: './individual-job-posting.component.html',
  styleUrls: ['./individual-job-posting.component.scss'],
})
export class IndividualJobPostingComponent implements OnInit {
  posting!: ParamMap;
  constructor(
    private Acrouter: ActivatedRoute, 
    private router: Router, 
    public database: Database,
    public authService: AuthService
    ) {}

myUser: any = {};
Applied: Boolean = false;


  ngOnInit() {
    this.posting = this.Acrouter.snapshot.queryParamMap;
    console.log(this.posting.getAll('Deadline'));
    this.myUser = this.authService.getUser();  
    console.log("This posting ID: " + this.posting.getAll('ID'));

    const dbRef = ref(this.database);
    const starCountRef = child(dbRef,`job-postings/${this.posting.get('ID')}/Candidates`);
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const keys =  Object.keys(data);
    console.log("keys: " + keys);
    if(keys.includes(this.myUser.uid)){
      this.Applied=true;
     }
   }); 
   console.log("notApplied : " +this.Applied)
  }

    //will perform to backend for when apply button is clicked
    applyAftermath(){
    const firebase = this.database;
    const dbRef = ref(this.database);
    var id = this.myUser.uid;
    if(this.myUser){
      const starCountRef = child(dbRef,`job-postings/${this.posting.get('ID')}/Candidates`);
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys =  Object.keys(data);
      console.log("keys: " + keys);
        if(!keys.includes(this.myUser.uid)){
          //send user id to job posting in candidates attribute
          var id1 = this.myUser.uid;
          const dbRef = ref(this.database);
          const userRef1 = child(dbRef, `job-postings/${this.posting.get('ID')}/Candidates`);
          update(userRef1, {[id1]:""});

          //send job posting to user student in appliedto attribute
          var id2 = this.posting.get('ID') as string;
          const userRef2 = child(dbRef, `students/${this.myUser.uid}/JobsApplied`);
          update(userRef2, {[id2]:""});
        }
     }); 
    }
  }
}
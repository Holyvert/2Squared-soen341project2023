import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import { Employer, JobPost, StudentProfile } from 'src/app/models/user.models';
import { Database, set, ref, onValue, child } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobPostComponent } from '../job-post/job-post.component';

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit{

  constructor(
    private Acrouter: ActivatedRoute, 
    private router: Router,
    public database: Database, 
    public authService: AuthService
    ) {}

    
    studentArray = [{} as StudentProfile];  //All Students
    //posting!: any;  //Getting job post object

    @Input() posting!: any;

    ngOnInit() {
      // this.posting = this.Acrouter.snapshot.queryParamMap;
       console.log(this.posting[0].ID, JSON.parse(JSON.stringify(this.posting)));


    }
      
    //Disables 'Select for Interview' and changes the text
    disableButton(element:any, text:any) {
      element.textContent = text;
      element.disabled = true;
    }


}


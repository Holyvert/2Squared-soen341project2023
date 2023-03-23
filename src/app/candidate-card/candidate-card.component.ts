import { Component, Input, OnInit } from '@angular/core';
import AOS from 'aos';
import { Employer, JobPost, StudentProfile } from 'src/app/models/user.models';
import { Database, set, ref, onValue, child } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JobPostComponent } from '../job-post/job-post.component';
import { RouterTestingModule } from "@angular/router/testing";

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

    @Input() student!: any;
    @Input() jobs!: any;

    ngOnInit() {
    
     // this.student = this.Acrouter.snapshot.queryParamMap;
     var sumeting = this.student[0];
      console.log('the students', sumeting, this.student[0].CV);
    }
      
    //Disables 'Select for Interview' and changes the text
    disableButton(element:any, text:any) {
      element.textContent = text;
      element.disabled = true;
    }


}

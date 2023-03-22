import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { Employer, JobPost, StudentProfile } from 'src/app/models/user.models';
import { Database} from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  posting!: any;
  constructor(private Acrouter: ActivatedRoute,){}
  ngOnInit() {
     this.posting = JSON.parse(JSON.stringify(this.Acrouter.snapshot.queryParamMap)).params;
     console.log(this.posting);
  }
    

}

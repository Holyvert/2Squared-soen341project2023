import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import AOS from 'aos';
import { Employer, JobPost, StudentProfile } from 'src/app/models/user.models';
import { Database, set, ref, onValue, child } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { RouterTestingModule } from "@angular/router/testing";

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
})
export class CandidateCardComponent implements OnInit, AfterContentChecked {
  posting: any;
  myStudent: any;
  SomeoneHere = true;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    public database: Database,
    public authService: AuthService
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
      console.log('this si my student ', this.myStudent.length, this.myStudent);
    }
  }

  //Disables 'Select for Interview' and changes the text
  disableButton(element: any, text: any) {
    element.textContent = text;
    element.disabled = true;
  }
}

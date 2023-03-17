import { onValue } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-individual-job-posting',
  templateUrl: './individual-job-posting.component.html',
  styleUrls: ['./individual-job-posting.component.scss'],
})
export class IndividualJobPostingComponent implements OnInit {
  posting!: ParamMap;
  authority!: string;
  constructor(private Acrouter: ActivatedRoute, private router: Router, private authService: AuthService,
    ) {}

  ngOnInit() {
    this.posting = this.Acrouter.snapshot.queryParamMap;
    console.log(this.posting.getAll('Deadline'));
    var myUser = this.authService.getUser();
    // console.log(myUser);
    //console.log(myUser.photoURL)
    this.authority = myUser.photoURL;
  }
}

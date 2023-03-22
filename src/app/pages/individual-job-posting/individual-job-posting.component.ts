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
  myUser!: any;
  index!: any;
  isEmployerWhoPosted: boolean = false;
  constructor(private Acrouter: ActivatedRoute, private router: Router, private authService: AuthService,
    ) {}

  ngOnInit() {
    this.posting = this.Acrouter.snapshot.queryParamMap;
    console.log(this.posting.getAll('Deadline'));
    this.myUser = this.authService.getUser();
    // console.log(myUser);
    //console.log(myUser.photoURL)
    this.authority = this.myUser.photoURL;
    this.index = this.Acrouter.snapshot.fragment;
console.log("INDX HECJSBFV:" +this.index)

    if (this.myUser && this.posting) {
      console.log(this.Acrouter.snapshot.queryParamMap);
      if (this.myUser.uid == this.posting.get('EmployerID'))
        this.isEmployerWhoPosted = true;
    }
  }

}

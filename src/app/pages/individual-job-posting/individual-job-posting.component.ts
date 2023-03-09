import { onValue } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-individual-job-posting',
  templateUrl: './individual-job-posting.component.html',
  styleUrls: ['./individual-job-posting.component.scss'],
})
export class IndividualJobPostingComponent implements OnInit {
  posting!: ParamMap;
  constructor(private Acrouter: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.posting = this.Acrouter.snapshot.queryParamMap;
  }
}

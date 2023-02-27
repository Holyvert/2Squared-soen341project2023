import { Component } from '@angular/core';
import AOS from 'aos';
import { JobPost } from '../models/user.models';
import { Database, set, ref, update, onValue, getDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss'],
})
export class JobPostComponent {

  constructor(public database: Database) {
  }

  jobTitle: String = 'Software Developer';
  jobDescription: String = 'Knowledge of Angular and TypeScript...';
  searchText: string = '';

  jobsArray = [{} as JobPost];

  ngOnInit(): void {
    AOS.init();
    const starCountRef = ref(this.database, 'job-postings/' );
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    // const keys = Object.keys(data);
    // const values = Object.values(data);
    // console.log(data);
    // console.log(keys);
    // console.log(values);
    this.jobsArray = ((Object as any).values(data));
    });
  }
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log('a letter', this.searchText);
  }
}

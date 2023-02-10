import { Component } from '@angular/core';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent {
  jobTitle: String = "Software Developer"; 
  jobDescription: String = "Knowledge of Angular and TypeScript..."; 
  jobsArray = [
    {jobTitle: "Software Developer",   jobDescription:'Knowledge of Angular and TypeScript is a requirement for this position. If you want to be developing the front and back end of an application, then this job is for you.'},
    {jobTitle: "Software Tester",   jobDescription:'Knowledge of Angular and TypeScript is a requirement for this position. If you want to be developing the front and back end of an application, then this job is for you.'},
    {jobTitle: "Software Architect", jobDescription:'Knowledge of Angular and TypeScript is a requirement for this position. If you want to be developing the front and back end of an application, then this job is for you.'}
  ];

  // constructor(jobTitle: String, jobDescription: String) {
  //   this.jobTitle = jobTitle;
  //   this.jobDescription = jobDescription;
  // }
}

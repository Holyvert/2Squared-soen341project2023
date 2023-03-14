import { Component } from '@angular/core';
import AOS from 'aos';
import { JobPost } from '../models/user.models';
import { Database, set, ref, update, onValue, getDatabase, child } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss'],
})
export class JobPostComponent {

  constructor(
    public database: Database, 
    private router: Router,
    public authService: AuthService
    ) {}

  jobTitle: String = 'Software Developer';
  jobDescription: String = 'Knowledge of Angular and TypeScript...';
  searchText: string = '';
  myUser: any = {};
 // isAlone: boolean = false;

  jobsArray = [{} as JobPost];
  soloApplication = {} as JobPost;

  ngOnInit(): void {
    AOS.init();
    this.myUser = this.authService.getUser();  
    
    if (this.router.url === "/#!") {
      const starCountRef = ref(this.database, 'job-postings/' );
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.jobsArray = ((Object as any).values(data));
      });

    //  this.isAlone = false;
      console.log(this.jobsArray)
    }
    else {
      const dbRef = ref(this.database);
      const starCountRef = child(
        dbRef,
        `students/${this.myUser.uid}/JobsApplied`
      );
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);

    for ( const item of keys){
    
    //this.jobsArray.push(this.getApplications(item);)
    }
      const values = Object.values(data);
      
      });  
      
    }
  }
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log('a letter', this.searchText);
  }

  getApplications(id: any) {
    const dbRef = ref(this.database);
    const starCountRef = child(dbRef, `job-postings/${id}` );
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    this.soloApplication = data;
    });
   // this.isAlone= true;
    //return somethis
  }
}

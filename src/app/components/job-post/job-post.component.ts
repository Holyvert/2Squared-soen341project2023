import { Component } from '@angular/core';
import AOS from 'aos';
import { JobPost } from '../../models/user.models';
import { Database, set, ref, update, child, onValue, getDatabase } from '@angular/fire/database';
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

  jobsArray = [{} as JobPost];
  myEmployerPostingsIDs: any = [];

  ngOnInit() {
    AOS.init();
    this.myUser = this.authService.getUser();  
    this.jobsArray = [];
    this.myEmployerPostingsIDs = [];
    if (this.router.url === "/" || this.router.url === "/#!") {
      
      const starCountRef = ref(this.database, 'job-postings/');
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.jobsArray = ((Object as any).values(data));
      console.log(this.jobsArray)
      });

    }
    if (this.router.url === "/my-postings") {
      const dbRef = ref(this.database);
      const starCountRef = child(dbRef,`job-postings/`);
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const keys =  Object.keys(data);
      console.log("keys: "+ keys)

      keys.forEach(element => {
        const starCountRef = child(dbRef, `job-postings/${element}` );
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log("employer ifd: " +this.myUser.uid)
        console.log("employer :"+data.EmployerID)
        if (data.EmployerID == this.myUser.uid) {
          this.myEmployerPostingsIDs.push(element);
        }
        });
      }); 

      this.myEmployerPostingsIDs.forEach((element: any) => {
        const starCountRef = child(dbRef, `job-postings/${element}` );
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.jobsArray.push(data);
        console.log("length: "+this.jobsArray.length)
        console.log(this.jobsArray)
        });
      }); 
      });  
    }
    if (this.router.url === "/applications") {
      const dbRef = ref(this.database);
      const starCountRef = child(dbRef,`students/${this.myUser.uid}/JobsApplied/`
      );
      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      const keys =  Object.keys(data);
        console.log("keys: "+ keys)
      const dbRef = ref(this.database);
      keys.forEach(element => {
        const starCountRef = child(dbRef, `job-postings/${element}` );
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.jobsArray.push(data);
        console.log("length: "+this.jobsArray.length)
        console.log(this.jobsArray)
        });
      }); 
      console.log("length: "+this.jobsArray.length)
      console.log(this.jobsArray)
      });  
    }

    else if (this.router.url === "/favorites") {
      this.jobsArray = [];

      const dbRef = ref(this.database);
      const starCountRef = child(dbRef,`students/${this.myUser.uid}/Favorites/`);

      onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      const keys =  Object.keys(data);
      console.log("keys: "+ keys)

     keys.forEach((element: any)  => {
      const dbRef = ref(this.database);
      console.log("element: "+element)
        const starCountRef = child(dbRef, `job-postings/${element}`);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.jobsArray.push(data);
        console.log("data: "+data)
        console.log(this.jobsArray)
        });
      }); 
      });  
    }

  }
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log('a letter', this.searchText);
  }

  getApplications(id: any): any {
    const dbRef = ref(this.database);
    const starCountRef = child(dbRef, `job-postings/${id}` );
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
    });
  }
}

import { Component } from '@angular/core';
import AOS from 'aos';
import { JobPost } from '../../models/user.models';
import {
  Database,
  set,
  ref,
  update,
  child,
  onValue,
  getDatabase,
  remove,
} from '@angular/fire/database';
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
    if (this.router.url === '/' || this.router.url === '/#!') {
      const starCountRef = ref(this.database, 'job-postings/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        this.jobsArray = (Object as any).values(data);
      });
    }

    if (this.router.url === '/my-postings') {
      const dbRef = ref(this.database);
      const starCountRef = child(dbRef, `job-postings/`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);

        keys.forEach((element) => {
          const starCountRef = child(dbRef, `job-postings/${element}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data.EmployerID == this.myUser.uid) {
              this.myEmployerPostingsIDs.push(element);
            }
          });
        });

        this.myEmployerPostingsIDs.forEach((element: any) => {
          const starCountRef = child(dbRef, `job-postings/${element}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            this.jobsArray.push(data);
          });
        });
      });
    }
    if (this.router.url === '/applications') {
      const dbRef = ref(this.database);
      const starCountRef = child(
        dbRef,
        `students/${this.myUser.uid}/JobsApplied/`
      );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const dbRef = ref(this.database);
        keys.forEach((element) => {
          const starCountRef = child(dbRef, `job-postings/${element}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            this.jobsArray.push(data);
          });
        });
      });
    } else if (this.router.url === '/favorites') {
      const dbRef = ref(this.database);
      const starCountRef = child(
        dbRef,
        `students/${this.myUser.uid}/Favorites/`
      );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);

        keys.forEach((element: any) => {
          const dbRef = ref(this.database);
          const starCountRef = child(dbRef, `job-postings/${element}`);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              this.jobsArray.push(data);
            } else {
              const starCountRef2 = child(
                dbRef,
                `students/${this.myUser.uid}/Favorites`
              );
              var mykeys: any;
              onValue(starCountRef2, (snapshot) => {
                const data = snapshot.val();
                mykeys = Object.keys(data);
              });
              //If there is only one key, then update it to an empty object instead of removing it
              if (mykeys.length == 1) {
                const userRef = child(dbRef, `students/${this.myUser.uid}`);
                update(userRef, { Favorites: '' });
              } else if (mykeys.includes(element as any)) {
                remove(
                  child(
                    dbRef,
                    `students/${this.myUser.uid}/Favorites/${element}`
                  )
                );
              }
            }
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
    const starCountRef = child(dbRef, `job-postings/${id}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  }
}

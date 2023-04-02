import { Component } from '@angular/core';
import {Database,set,ref,update, onValue, get, child, remove} from '@angular/fire/database'
import { AuthService } from '../services/auth.service';
import AOS from 'aos';
import { SelectedInterview } from '../models/user.models';

@Component({
  selector: 'app-student-int-card',
  templateUrl: './student-int-card.component.html',
  styleUrls: ['./student-int-card.component.scss']
})
export class StudentIntCardComponent {
    myUser: any = {};
    selectedInterviewsArray: any = [];
    selectedInterviewsIDs: any =[];
  
    constructor(
      public database: Database, 
      public authService: AuthService
      ) {}
  
    ngOnInit() {
      AOS.init();
      this.myUser = this.authService.getUser();  
      this.selectedInterviewsArray = [];  
      const dbRef = ref(this.database);
      if(this.myUser) {
        const starCountRef = ref(this.database, `students/${this.myUser.uid}/SelectedInterviews`);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys =  Object.keys(data);
        this.selectedInterviewsIDs = ((Object as any).values(keys));
  
        this.selectedInterviewsIDs.forEach((element: any) => {
          const starCountRef = child(dbRef, `job-postings/${element}` );
          onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if(data != undefined){
            this.selectedInterviewsArray.push(data);
          }
          });
        }); 
        });
      }
    }

}

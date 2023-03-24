import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Database, ref, child, remove, onValue, set } from '@angular/fire/database';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { JobPost } from 'src/app/models/user.models';
import { update } from 'firebase/database';

@Component({
  selector: 'app-individual-job-posting',
  templateUrl: './individual-job-posting.component.html',
  styleUrls: ['./individual-job-posting.component.scss'],
})
export class IndividualJobPostingComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  posting!: ParamMap;
  authority!: string;
  myUser!: any;
  isEmployerWhoPosted: boolean = false;  
  favorited: Boolean = false;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public database: Database
  ) {}

  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    this.posting = this.Acrouter.snapshot.queryParamMap;
    if (this.myUser && this.posting) {
      if (this.myUser.photoURL == 'Student') {
        this.authority = 'Student';
      } else if (this.myUser.photoURL == 'Employer') {
        this.authority = 'Employer';
        if (this.myUser.uid == this.posting.get('EmployerID')) {
          console.log(this.posting.keys);
          this.isEmployerWhoPosted = true;
        }
      }
      const dbRef= ref(this.database);
      var id = this.myUser.uid;
      const starCountRef = child(dbRef, `students/${id}/Favorites`)
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        if (keys.includes(this.posting.get('ID') as any)) {
          this.favorited = true;
        }
       else if (!keys.includes(this.posting.get('ID') as any)){
          this.favorited = false;
        }
      })
    }
  }

  onDeleteJobPosting() {
    if (this.myUser) {
      const dbRef = ref(this.database);

      remove(child(dbRef, `job-postings/${this.posting.get('ID')}`));
      this.sendNotification(
        `Posting ${this.posting.get('JobTitle')} was deleted!`
      );
      this.router.navigate(['']);
    }
  }

  sendNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  addToFavorites() {
    const dbRef= ref(this.database);
     var id = this.myUser.uid;
     if(this.myUser) {
      const starCountRef = child(dbRef, `students/${id}/Favorites`)
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        if (!keys.includes(this.posting.get('ID') as any) || !keys) {
          var postingId = this.posting.get('ID') as any;
          const userRef = child(dbRef, `students/${id}/Favorites`)
          update(userRef, {[postingId]: ""});
        }
      })
      this.favorited= true;
      this.sendNotification("Post has been added to Favorites")
     }
  }
  deleteFromFavorites() {
    const dbRef= ref(this.database);
     var id = this.myUser.uid;
     if(this.myUser) {
      const starCountRef = child(dbRef, `students/${id}/Favorites`)
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        if (keys.length == 1) { //need to fix
          const userRef = child(dbRef, `students/${id}`)
          update(userRef, {Favorites: ""});
          this.favorited = false;
          this.sendNotification("Post has been removed from Favorites")
          return;
        }
        if (keys.includes(this.posting.get('ID') as any)) {
          var postingId = this.posting.get('ID') as any;
          remove(child(dbRef, `students/${id}/Favorites/${postingId}`))
          this.favorited = false;
          this.sendNotification("Post has been removed from Favorites")
        }
      })
     }
  }
}

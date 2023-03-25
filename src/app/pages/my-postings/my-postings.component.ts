import { Component } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-postings',
  templateUrl: './my-postings.component.html',
  styleUrls: ['./my-postings.component.scss']
})
export class MyPostingsComponent {
  myUser: any = {};

  
  constructor(
    public database: Database,
    private authService: AuthService,
    private router: Router,

  ) {}

  ngOnInit(){
  this.myUser = this.authService.getUser();

  if (this.myUser) {
      if (this.myUser.photoURL == 'Student') {
          this.router.navigate(['']);
      }
  } 
  } 
}

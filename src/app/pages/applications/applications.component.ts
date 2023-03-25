import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Database} from '@angular/fire/database';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  myUser: any = {};

  
  constructor(
    public database: Database,
    private authService: AuthService,
    private router: Router,

  ) {}

  ngOnInit(){
  this.myUser = this.authService.getUser();

  if (this.myUser) {
      if (this.myUser.photoURL == 'Employer') {
          this.router.navigate(['']);
      }
  } 
  } 
}

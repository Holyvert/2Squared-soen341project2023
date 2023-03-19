import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-interviews',
  templateUrl: './student-interviews.component.html',
  styleUrls: ['./student-interviews.component.scss']
})
export class StudentInterviewsComponent {

  myUser: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    if(this.myUser){
      if (this.myUser.photoURL == 'Employer') {
        this.router.navigate([''])
      }
    }
  }

}

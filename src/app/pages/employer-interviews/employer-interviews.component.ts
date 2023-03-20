import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employer-interviews',
  templateUrl: './employer-interviews.component.html',
  styleUrls: ['./employer-interviews.component.scss']
})
export class EmployerInterviewsComponent {

  myUser: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.myUser = this.authService.getUser();
    if(this.myUser){
      if (this.myUser.photoURL == 'Student') {
        this.router.navigate([''])
      }
    }
  }

}

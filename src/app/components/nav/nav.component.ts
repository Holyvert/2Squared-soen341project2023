import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewChecked {
authority!: string;
myUser!: any;
  constructor(
    public authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked() {
     this.myUser = this.authService.getUser();
    // console.log(myUser);
    //console.log(myUser.photoURL)
    if (this.myUser){
      this.authority = this.myUser.photoURL;
    }
   
  }

  
  myFunction() {
    var x = document.getElementById("myDIV");
    
    if(x!=null)
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

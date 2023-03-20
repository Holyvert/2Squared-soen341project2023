import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewChecked {
authority!: string;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    var myUser = this.authService.getUser();
    // console.log(myUser);
    //console.log(myUser.photoURL)
    if (myUser){
      this.authority = myUser.photoURL;
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

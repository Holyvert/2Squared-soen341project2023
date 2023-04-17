import { AfterViewChecked, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewChecked {
  authority!: string;
  myUser!: any;
  constructor(
    public authService: AuthService,
    private router: Router,
    private Acrouter: ActivatedRoute
  ) {}

  ngAfterViewChecked() {
    this.myUser = this.authService.getUser();
    const type = this.Acrouter.snapshot.params['type'];
     if (type!= undefined) {
       this.authority = type;
     }
    if (this.myUser) {
      this.authority = this.myUser.photoURL;
    }
  }

  myFunction() {
    let x = document.getElementById("myDIV");
    
    if(x!=null)
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
}

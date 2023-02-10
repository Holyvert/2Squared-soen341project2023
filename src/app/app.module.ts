import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './pages/landing/landing.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { AuthguardGuard } from './services/authguard.guard';
import { HttpClientModule } from '@angular/common/http';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { JobPostComponent } from './job-post/job-post.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    JobPostComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatSelectModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [CookieService, StorageService, AuthService, AuthguardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {AngularFireModule} from '@angular/fire/compat';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {provideDatabase,getDatabase} from '@angular/fire/database';
import { EmployerFormComponent } from './pages/employer-form/employer-form.component';
import { IndividualJobPostingComponent } from './pages/individual-job-posting/individual-job-posting.component'
import { RouterModule } from '@angular/router';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import {provideStorage,getStorage} from '@angular/fire/storage';
import {provideAuth} from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getAuth } from 'firebase/auth';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ApplicationsComponent } from './pages/applications/applications.component';


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
    EmployerFormComponent,
    IndividualJobPostingComponent,
    ApplicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatMenuModule,
    MatSelectModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideDatabase(()=>getDatabase()),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=>getStorage()),
    provideAuth(()=>getAuth()),
    MatProgressSpinnerModule,
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

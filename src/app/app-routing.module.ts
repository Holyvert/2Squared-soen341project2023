import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployerFormComponent } from './pages/employer-form/employer-form.component';
import { IndividualJobPostingComponent } from './pages/individual-job-posting/individual-job-posting.component';
import { AuthguardGuard} from './services/authguard.guard';
import { ApplicationsComponent } from './pages/applications/applications.component';




const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AuthguardGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthguardGuard] },
  { path: 'employer-form', component: EmployerFormComponent, canActivate: [AuthguardGuard] },
  { path: 'individual', component: IndividualJobPostingComponent, canActivate: [AuthguardGuard] },
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthguardGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

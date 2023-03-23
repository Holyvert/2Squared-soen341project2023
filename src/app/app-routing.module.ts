import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployerFormComponent } from './pages/employer-form/employer-form.component';
import { IndividualJobPostingComponent } from './pages/individual-job-posting/individual-job-posting.component';
import { EditEmployerFormComponent } from './pages/edit-employer-form/edit-employer-form.component';
import { EmployerInterviewsComponent } from './pages/employer-interviews/employer-interviews.component';
import { StudentInterviewsComponent } from './pages/student-interviews/student-interviews.component';
import { AuthguardGuard} from './services/authguard.guard';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { MyPostingsComponent } from './pages/my-postings/my-postings.component';




const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AuthguardGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthguardGuard] },
  { path: 'employer-form', component: EmployerFormComponent, canActivate: [AuthguardGuard] },
  { path: 'individual', component: IndividualJobPostingComponent, canActivate: [AuthguardGuard] },
  { path: 'edit-employer-form', component: EditEmployerFormComponent},
  { path: 'applications', component: ApplicationsComponent, canActivate: [AuthguardGuard] },
  { path: 'employer-interviews', component: EmployerInterviewsComponent, canActivate: [AuthguardGuard] },
  { path: 'student-interviews', component: StudentInterviewsComponent, canActivate: [AuthguardGuard] },
  { path: 'my-postings', component: MyPostingsComponent, canActivate: [AuthguardGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

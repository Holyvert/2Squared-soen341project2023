export interface Employer{
  ID: string;
  Company: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Language: string;
}

export interface JobPost {
  Company: string;
  Description: string;
  Duration: string;
  Image: string;
  JobLocation: string;
  JobLocationType: string;
  JobTitle: string;
  Salary: string;
  Supervisor: string;
  Candidates: any; // list vof ids
  ID: string; //its own id
  Requirements: string;
  Deadline: string;
  DocsRequired: string;
  ApplicationMethod: string;
  JcFirstName: string;
  JcLastName: string;
  Website: string;
  City: string;
  Province: string;
  PostalCode: string;
  Email: string;
  EmployerID: string;
  SelectedInterviews: any;
}

export interface StudentProfile {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  Program: string;
  Description: string;
  Language: string;
  JobsApplied: any; // list vof ids
  CV: string;
  CVName: string;
  ID: string;
  SelectedInterviews: any;
  Favorites: any; // list of ids
}

export interface User {
  uid: string;
  email: string;
  photoURL: string;
}

export interface SelectedInterview {
  CompanyName: string;
  JobTitle: string;
  Supervisor: string;
  JcFirstName: string;
  JcLastName: string;
  Email: string;
}
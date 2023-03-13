export interface Employer{
  ID: string;
  Company: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Language: string;
  Password: string;
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
  ApplicationMethod: string;
  City: string;
  Deadline: string;
  DocsRequired: string;
  JcFirstName: string;
  JcLastName: string;
  PostalCode: string;
  Province: string;
  Requirements: string;
  Website: string;
  StudentListIDs: any; // list vof ids
  id: string; //its own id
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
  Password: string;
}

export interface User {
  uid: string;
  email: string;
  photoURL: string;
}
export interface Employer{
  uid: string;
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  password: string;
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
}
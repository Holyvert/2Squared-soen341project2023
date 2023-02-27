export interface Student {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  password: string;
}


export interface Employer{
  uid: string;
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  language: string;
  password: string;
}

export interface JobPost{
  Company: string;
  Description: string;
  Duration: string;
  Image: string;
  JobLocation: string;
  JobLocationType: string;
  JobTitle: string;
  Salary: string;
  Supervisor: string;
}
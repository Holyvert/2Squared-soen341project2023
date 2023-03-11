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
  job_title:String,
  job_location:String,
  job_location_type:String,
  salary:String,
  duration:String,
  supervisor:String,
  job_description:String,
  job_requirements:String,
  deadline:String,
  docs_required:String,
  application_method:String,
  organization:String,
  jc_first_name:String,
  jc_last_name:String,
  website:String,
  // address:value.address,
  city:String,
  province:String,
  postal_code:String,
  image:String,
}

export interface StudentProfile {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  Program: string;
  Description: string;
  Language: string;
  CV: string;
}
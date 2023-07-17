enum Gender {
    'male',
    'female'
  }

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  gender: Gender;
  birth_date: Date;
  email:string;
  address:string;
  mobile:string
}
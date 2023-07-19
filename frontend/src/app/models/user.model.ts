import { Role } from "./role.model";

enum Gender {
    'male',
    'female'
  }

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  user_image: Uint8Array;
  password: string;
  gender: Gender;
  birth_date: Date;
  email:string;
  address:string;
  mobile:string
  role:Role
}
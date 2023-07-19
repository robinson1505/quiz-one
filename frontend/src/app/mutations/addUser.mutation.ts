import { gql } from 'apollo-angular';

const AddUser = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $userImage:String!
    $password: String!
    $email: String!
    $gender:String!
    $birthDate: String!
    $address: String!
    $mobile: String!
  
  ) {
    registerUser(
      first_name: $firstName
      last_name: $lastName
      user_image:$userImage
      password: $password
      email: $email
      gender: $gender
      birth_date: $birthDate
      address: $address
      mobile: $mobile
   
    ) {
      first_name
      user_image
    }
  }
`;
export default AddUser;

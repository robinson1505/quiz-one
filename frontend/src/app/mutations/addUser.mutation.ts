import { gql } from 'apollo-angular';

const AddUser = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
    $gender: Gender!
    $birthDate: String!
    $address: String!
    $mobile: String!
  ) {
    registerUser(
      first_name: $firstName
      last_name: $lastName
      password: $password
      email: $email
      gender: $gender
      birth_date: $birthDate
      address: $address
      mobile: $mobile
    ) {
      first_name
    }
  }
`;
export default AddUser;

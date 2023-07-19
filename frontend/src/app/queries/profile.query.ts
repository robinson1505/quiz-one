import { gql } from 'apollo-angular';

const PROFILE = gql`
  query {
    profile{
      id
      first_name
      last_name
    
      email
      address
      password
      mobile
      gender
      birth_date
      role{
        role_name
      }
    }
  }
`;
export default PROFILE;

import { gql } from 'apollo-angular';

const PROFILE = gql`
  query {
    profile{
      first_name
      last_name
      email
      address
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

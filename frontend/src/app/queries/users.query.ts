import { gql } from 'apollo-angular';

const GET_USERS = gql`
  query {
    getUsers {
        first_name
        last_name
        email
        birth_date
        address
        mobile
      }
  }
`;
export default GET_USERS;

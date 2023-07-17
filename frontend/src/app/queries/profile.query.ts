import { gql } from 'apollo-angular';

const PROFILE = gql`
  query {
    profile{
      last_name
    }
  }
`;
export default PROFILE;

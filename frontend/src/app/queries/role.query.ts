import { gql } from 'apollo-angular';

const GET_ROLES = gql`
  query {
  getAllRoles{
    role_name
  }
  }
`;
export default GET_ROLES;

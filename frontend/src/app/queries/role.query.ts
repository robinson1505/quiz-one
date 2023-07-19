import { gql } from 'apollo-angular';

const GET_ROLES = gql`
  query {
  getAllRoles{
    id
    role_name
  }
  }
`;
export default GET_ROLES;

import { gql } from 'apollo-angular';
const UpdateUser = gql`
  mutation UpdateUser(
    $data: UpdateInput
  ) {
    updateUser(
      data: $data
    ) {
      id
      first_name
      last_name
      email
      address
      mobile
      gender
      birth_date
    }
  }
`;
export default UpdateUser;

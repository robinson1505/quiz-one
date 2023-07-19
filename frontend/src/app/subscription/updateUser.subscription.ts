import { gql } from 'apollo-angular';

const UserSubscription = gql`
  subscription {
    subscribeUser{
      id
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
export default UserSubscription;

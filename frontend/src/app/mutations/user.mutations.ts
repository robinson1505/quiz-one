import { gql } from "apollo-angular";

const Login = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
export default Login;
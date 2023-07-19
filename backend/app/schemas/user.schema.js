const userDefs = `
enum Gender{
   male
   female
}
type User{
    id:ID!
    first_name:String!
    last_name:String!
    password:String!
   
    email:String!
    gender:Gender!
    birth_date:String!
    address:String!
    mobile:String!
    role:Role
    }
    extend type Query{
        profile:User
        getUsers:[User]
    }
    input UpdateInput{
    id:ID!
    first_name:String
    last_name:String
    password:String
   
    email:String
    gender:String
    birth_date:String
    address:String
    mobile:String
    }
extend type Mutation {
    registerUser( 
        first_name:String!
        last_name:String!
        password:String!
      
        email:String!
        gender:String!
        birth_date:String!
        address:String!
        mobile:String!
        ):User
        login(
            email :String!
            password:String!
            ):String!
            updateUser( 
                data:UpdateInput
                
                ):User
}
type Subscription {
    subscribeUser(id:ID): String
  }

`;
export default userDefs;

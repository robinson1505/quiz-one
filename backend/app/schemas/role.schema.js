const roleDefs =`
enum RoleNames{
    admin
    user
 }
type Role{
    id:ID!
    role_name:RoleNames
}
extend type Query{
    getAllRoles:[Role!]!
}
extend type Mutation{
    createRole(role_name:String!):Role
}`;

export default roleDefs;
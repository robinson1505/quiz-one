import userResolver from "./user.resolver.js";
import roleResolver from "./role.resolver.js";

const resolvers = [
    userResolver,
    roleResolver
]
export default resolvers;
import root from "./root.js";
import userDefs from "./user.schema.js";
import roleDefs from "./role.schema.js";

const typeDefs = [userDefs,root,roleDefs];

export default typeDefs;

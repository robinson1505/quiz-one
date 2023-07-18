import { Role } from "../models/index.js";

const roleResolver = {
  Query: {
    getAllRoles: async (parent) => {
      try {
        const role = await Role.findAll();
        return role;
      } catch (error) {
        console.log("Error fetching roles: ", error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createRole: async (parent, args) => {
      try {
        const role = await Role.create({ role_name: args.role_name });
        return role;
      } catch (error) {
        console.log("Error creating role: ", error);
        throw new Error(error);
      }
    },
  },
};

export default roleResolver;

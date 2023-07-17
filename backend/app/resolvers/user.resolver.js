import User from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    profile: async (parent,args,context,info) => {
      console.log(context.user);
      console.log("context only", context.user.user.id);
      try {
        const id = context.user.user.id;
        console.log(id);
        if (!id) {
          throw new Error("User not authenticated");
        }
        const user = await User.findOne({
          where: { id },
        });
        return user;
      } catch (error) {
        console.log("Error fetching user: ", error);
        throw new Error(error);
      }
    },
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.error("Error fetching lecturers data: ", error);
        throw new Error("Error fetching lecturers data");
      }
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      try {
        const user = await User.create({
          first_name: args.first_name,
          last_name: args.last_name,
          password: hashedPassword,
          email: args.email,
          gender: args.gender,
          birth_date: args.birth_date,
          address: args.address,
          mobile: args.mobile,
        });
        return user;
      } catch (error) {
        console.error("Error there some field are null: ", error);
        throw new Error(error);
      }
    },
    login: async (_, args, context, info) => {
      try {
        const user = await User.findOne({
          where: { email: args.email },
        });
        if (!user) {
          throw new Error("Invalid credential");
        }
        const isMatch = await bcrypt.compare(args.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credential");
        }
        const token = jwt.sign(
          {
            user: { id: user.id, username: user.email },
          },
          "MyPrivate",
          { expiresIn: "1h" }
        );
        console.log(token);
        return token;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};
export default userResolver;

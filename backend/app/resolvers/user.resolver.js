import { User, Role } from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from  'fs' 
import { GraphQLError } from "graphql";


const userResolver = {
  Query: {
    profile: async (parent, args, context, info) => {

      try {
        const id = context.user.user.id;
        console.log(id);
        if (!id) {
          throw new Error("User not authenticated");
        }
        const user = await User.findOne({
          where: { id },
          include: { model: Role },
        });
       // console.log("USER IMAGE BEFORE CONVERTION",user.user_image)
        // if (user.user_image) {
          //user.user_image = user.user_image.toString('base64');
            console.log("USER IMAGE AFTER CONVERTION",user.user_image)
        //}
      
        return user;
      } catch (error) {
        console.log("Error fetching user: ", error);
        throw new Error(error);
      }
    },
    getUsers: async () => {
      try {
        const users = await User.findAll({
          include: {
            model: Role,
          },
        });
         console.log("USER IMAGE BEFORE CONVERTION",users)
         if (users.user_image) {
          users.user_image = users.user_image.toString('base64');
        }
       

        return users;
      } catch (error) {
        console.error("Error fetching users data: ", error);
        throw new Error("Error fetching users data");
      }
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
  
      const hashedPassword = await bcrypt.hash(args.password, 10);
     
      try {
      const role = await Role.findOne({where:{role_name:'user'}});
      
        const user = await User.create({
          first_name: args.first_name,
          last_name: args.last_name,
          password: hashedPassword,
         
          email: args.email,
          gender: args.gender,
          birth_date: args.birth_date,
          address: args.address,
          mobile: args.mobile,
          user_role: role.id,
        });
        //const fileName =`user-${user.user_image}`
        //const path = `images/${fileName}`
        //fs.writeFileSync(path,args.user_image);
        
        return user;
      } catch (error) {
        console.error("Error there some field are null: ", error);
        throw new Error(error);
      }
    },
    updateUser: async (parent, {data}) => {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      console.log("UPADTE ID",data)
      try {
        const user = await User.findOne({ where: { id: data.id } });
        console.log("MY USER",user)
        user.update({
          first_name: data.first_name,
          last_name: data.last_name,
          password: hashedPassword,
         
          email: data.email,
          gender: data.gender,
          birth_date: data.birth_date,
          address: data.address,
          mobile: data.mobile,
          
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
            user: { id: user.id, username: user.email, role: user.user_role },
          },
          "MyPrivate",
          { expiresIn: "24h" }
        );
        console.log(token);
        return token;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
  Subscription: {
    subscribeUser: {
      subscribe: async(_, args,context,info) => {
    // const contextID =context.user.user.id
    const id = args.id
    const user = await User.findOne({where:id});
      console.log('CONTEXT ID',args)
      console.log('SUBSCRIBE ID',id)
      
      return id;
      },
    },
  },
};
export default userResolver;

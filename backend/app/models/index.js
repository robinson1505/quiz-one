import DataTypes from "sequelize";
import sequelize from "../config/db.config.js";
import UserModel from "./tables/user.model.js";

const User = UserModel(sequelize, DataTypes);
export default User;

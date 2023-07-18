import DataTypes from "sequelize";
import sequelize from "../config/db.config.js";
import UserModel from "./tables/user.model.js";
import RoleModel from "./tables/role.model.js";

const Role = RoleModel(sequelize,DataTypes);
const User = UserModel(sequelize, DataTypes);


Role.hasMany(User, { foreignKey: "user_role" });
User.belongsTo(Role, { foreignKey: "user_role" });
export {
    Role,
    User
};

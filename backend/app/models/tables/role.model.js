export default (sequelize, DataTypes) => {
    const RoleModel = sequelize.define(
      "role",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        role_name: {
          type: DataTypes.ENUM("admin", "user"),
          allowNull: false,
          defaultValue:"user"
        },
       
      },
      { timestamps: false, freezeTableName: true }
    );
    return RoleModel;
  };
  
export default (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: 4 },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return UserModel;
};

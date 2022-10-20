const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diets", {
    name: {
      type: DataTypes.STRING,

      allowNull: false,
    },
  });
};

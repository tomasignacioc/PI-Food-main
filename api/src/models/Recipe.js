const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER
    },
    "healthy food level": {
      type: DataTypes.INTEGER
    },
    "step by step": {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    difficulty: {
      type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    season: {
      type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
      allowNull: false
    }

  }, {
    timestamps: false
  });
};
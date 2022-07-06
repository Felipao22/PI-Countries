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
    dificultad: {
      type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
      allowNull: false,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    temporada: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false
    }

  }, {
    timestamps: false
  });
};
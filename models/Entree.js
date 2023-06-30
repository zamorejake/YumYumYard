const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Entree extends Model {}

Entree.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    in_stock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    allergy: {
      type: DataTypes.JSON,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'entree',
  }
);

module.exports = Entree;

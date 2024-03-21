'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tipe.hasMany(models.Product, { foreignKey: 'tipeId' });
    }
  }
  Tipe.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipe',
  });
  return Tipe;
};
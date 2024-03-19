'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cattegory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cattegory.hasMany(models.Product, { foreignKey: 'kategoriId' });
    }
  }
  Cattegory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cattegory',
  });
  return Cattegory;
};
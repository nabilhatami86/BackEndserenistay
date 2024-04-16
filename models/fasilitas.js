'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fasilitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Fasilitas.belongsToMany(models.Product, { through: 'ProductFasilitas', foreignKey: 'fasilitasId' });
    }
  }
  Fasilitas.init({
    fasilitas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fasilitas',
  });
  return Fasilitas;
};
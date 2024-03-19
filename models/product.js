'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Cattegory, { foreignKey: 'kategoriId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    ruangan: DataTypes.INTEGER,
    kamarmandi: DataTypes.INTEGER,
    luastanah: DataTypes.INTEGER,
    kategoriId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
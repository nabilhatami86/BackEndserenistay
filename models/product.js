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
      Product.belongsTo(models.Cattegory, { foreignKey: 'categoryId' });
      Product.belongsTo(models.Tipe, { foreignKey: 'tipeId' });
      Product.belongsTo(models.Address, { foreignKey: 'addressId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    tipeId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
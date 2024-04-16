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
      // Product.belongsTo(models.Tipe, { foreignKey: 'tipeId' });
      Product.belongsTo(models.Address, { foreignKey: 'addressId' });
      // Product.belongsToMany(models.Fasilitas, {through: 'ProductFasilitas', foreignKey: 'productId' });
      Product.hasMany(models.Cart, { foreignKey: 'productId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    luas_ruangan: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    fasilitasId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    tipeId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
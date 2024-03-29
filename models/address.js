'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.hasMany(models.Product, { foreignKey: 'addressID' });
    }
  }
  Address.init({
    negara: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kota: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    desa: DataTypes.STRING,
    nama_jalan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
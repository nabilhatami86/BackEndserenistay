'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init({
    negara: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kabupaten: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    desa: DataTypes.STRING,
    nama_jalan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};
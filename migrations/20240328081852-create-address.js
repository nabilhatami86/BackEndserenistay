'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      negara: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provinsi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kota: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kecamatan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nama_jalan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};
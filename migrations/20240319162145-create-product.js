'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ruangan: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kamarmandi: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      luastanah: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kategoriId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId:{
        type : Sequelize.INTEGER,
        allowNull: false
      },
      image:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('Products');
  }
};
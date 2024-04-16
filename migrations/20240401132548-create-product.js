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
        
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      luas_ruangan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(['tersedia', 'tersewa','dibooking']),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipe_kos: {
        type : Sequelize.ENUM(['Cowok','Cewek','Campur']),
        allowNull: false
      },
      tipe_ruangan: {
        type: Sequelize.ENUM(['Single', 'Double', 'Suite', 'Shared']),
        allowNull: false

      },
      discount: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.STRING
      },
      fasilitasId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tipeId: {
        type: Sequelize.INTEGER
      },
      addressId: {
        type: Sequelize.INTEGER,
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
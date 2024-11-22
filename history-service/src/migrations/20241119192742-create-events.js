'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('events', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      product_id: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      shop_id: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      action: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      qty: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
      }
  });

  await queryInterface.addIndex('events', ['product_id']);
  await queryInterface.addIndex('events', ['created_at']);

  },

  async down (queryInterface) {
    await queryInterface.dropTable('events');
  }
};

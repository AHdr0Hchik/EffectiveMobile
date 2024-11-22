'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shops', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.bulkInsert('shops', [
      {
        name: 'Магазин на Ленина',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Магазин на Пушкина',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Магазин на Гагарина',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shops');
  }
};

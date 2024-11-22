'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stocks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      shop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      shelf_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      },
      order_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
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

    // Создаем составной уникальный индекс
    await queryInterface.addIndex('stocks', ['product_id', 'shop_id'], {
      unique: true,
      name: 'idx_stocks_product_shop_unique'
    });

    // Создаем индексы для внешних ключей
    await queryInterface.addIndex('stocks', ['product_id'], {
      name: 'idx_stocks_product_id'
    });

    await queryInterface.addIndex('stocks', ['shop_id'], {
      name: 'idx_stocks_shop_id'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stocks');
  }
};

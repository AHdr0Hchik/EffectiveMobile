'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hasProblems: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Создаем функцию для генерации случайных данных
    const generateRandomUser = () => ({
      firstName: ['Андрей', 'Роман', 'Николай', 'Алексей', 'Дмитрий'][Math.floor(Math.random() * 5)],
      lastName: ['Хоменко', 'Ахмадеев', 'Прохоренко', 'Юрьев'][Math.floor(Math.random() * 4)],
      age: Math.floor(Math.random() * 50) + 18,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      hasProblems: Math.random() > 0.5,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Заполняем таблицу данными батчами по 1000 записей
    const batchSize = 1000;
    const totalRecords = 1000000;

    for (let i = 0; i < totalRecords; i += batchSize) {
      const users = Array(batchSize)
        .fill(null)
        .map(generateRandomUser);

      await queryInterface.bulkInsert('Users', users);
      console.log(`Inserted records ${i + 1} to ${i + batchSize}`);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};

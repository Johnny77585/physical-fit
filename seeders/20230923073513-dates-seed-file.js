'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Dates', [
      {
        date: '2023-09-20',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: '2023-09-21',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: '2023-09-22',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dates', null, {})
  }
}

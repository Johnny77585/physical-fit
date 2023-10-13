'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Dates', [
      {
        date: '2023-10-20',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: '2023-10-21',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: '2023-10-22',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dates', null, {})
  }
}

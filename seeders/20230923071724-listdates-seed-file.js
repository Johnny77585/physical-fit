'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listDates', [
      {
        list_id: 1,
        date_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 2,
        date_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        list_id: 3,
        date_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('listDates', null, {})
  }
}

'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ListDates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_id: {
        type: Sequelize.INTEGER
      },
      list_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ListDates')
  }
}

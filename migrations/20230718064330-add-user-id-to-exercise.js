'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Exercises', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Exercises', 'user_id')
  }
}

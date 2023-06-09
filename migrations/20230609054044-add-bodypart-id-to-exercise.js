'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Exercises', 'bodypart_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Bodyparts',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Exercises', 'bodypart_id')
  }
}

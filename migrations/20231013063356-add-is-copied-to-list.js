'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Lists', 'isCopied', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Lists', 'isCopied')
  }
}

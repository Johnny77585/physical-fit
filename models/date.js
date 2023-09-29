'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Date.belongsToMany(models.List, {
        through: models.ListDate,
        foreignKey: 'dateId',
        as: 'dateListed'
      })
    }
  }
  Date.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Date',
    tableName: 'Dates',
    underscored: true
  })
  return Date
}

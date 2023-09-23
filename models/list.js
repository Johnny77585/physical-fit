'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      List.belongsTo(models.Date, { foreignKey: 'dateId' })
      List.belongsTo(models.User, { foreignKey: 'userId' })
      List.belongsToMany(models.Exercise, {
        through: models.ExerciseList,
        foreignKey: 'ListId',
        as: 'ListedExercise'
      })
      List.belongsToMany(models.Date, {
        through: models.Listdate,
        foreignKey: 'ListId',
        as: 'ListedDates'
      })
    }
  }
  List.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List'
  })
  return List
}

'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ExerciseList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      ExerciseList.belongsTo(models.Exercise, { foreignKey: 'exerciseId' })
      ExerciseList.belongsTo(models.List, { foreignKey: 'listId' })
    }
  }
  ExerciseList.init({
    exerciseId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExerciseList'
  })
  return ExerciseList
}

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
      ExerciseList.belongsTo(models.List, { foreignKey: 'listId' })
      ExerciseList.belongsTo(models.Exercise, { foreignKey: 'exerciseId' })
    }
  }
  ExerciseList.init({
    exerciseId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER,
    setsDetails: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'ExerciseList',
    tableName: 'ExerciseLists',
    underscored: true
  })
  return ExerciseList
}

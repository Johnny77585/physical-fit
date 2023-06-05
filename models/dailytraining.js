'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DailyTraining extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      DailyTraining.belongsTo(models.User)
    }
  }
  DailyTraining.init({
    date: DataTypes.DATE,
    sets: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    UserExerciseId: DataTypes.INTEGER,
    exerciseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DailyTraining'
  })
  return DailyTraining
}

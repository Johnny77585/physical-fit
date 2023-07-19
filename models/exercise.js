'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Exercise.belongsTo(models.Bodypart, { foreignKey: 'bodypartId' })
      Exercise.belongsTo(models.User, { foreignKey: 'userId' })
      Exercise.hasMany(models.Set, { foreignKey: 'exerciseId' })
      Exercise.hasMany(models.Exerciselist, { foreignKey: 'exerciseId' })
    }
  }
  Exercise.init({
    name: DataTypes.STRING,
    Photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exercise',
    underscored: true
  })
  return Exercise
}

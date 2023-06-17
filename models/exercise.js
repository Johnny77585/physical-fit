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

'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Set extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Set.belongsTo(models.Exercise, { foreignKey: 'exerciseId' })
    }
  }
  Set.init({
    exerciseId: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    repetitions: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Set'
  })
  return Set
}

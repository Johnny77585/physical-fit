'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Bodypart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Bodypart.hasMany(models.Exercise, { foreignKey: 'bodypartId' })
    }
  };
  Bodypart.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bodypart',
    underscored: true
  })
  return Bodypart
}

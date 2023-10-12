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
      List.belongsTo(models.User, { foreignKey: 'userId' })
      List.hasMany(models.ExerciseList, { foreignKey: 'listId' })
      List.belongsToMany(models.Date, {
        through: 'ListDate',
        foreignKey: 'listId',
        otherKey: 'dateId',
        as: 'ListedDates'
      })
    }
  }
  List.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
    tableName: 'Lists',

    underscored: true
  })
  return List
}

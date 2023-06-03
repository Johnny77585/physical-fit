'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.DailyTraining)
    }
  }
  User.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    info: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    created_at: DataTypes.DATE,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    bmi: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}

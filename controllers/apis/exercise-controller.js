const { Exercise, Bodypart } = require('../../models')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })
const JwtSecret = process.env.JWT_SECRET

const exerciseController = {
  getExercises: (req, res) => {
    const token = req.cookies.token
    const bodypartName = req.query.bodypart
    if (token) {
      const decodedToken = jwt.verify(token, JwtSecret)
      const userId = decodedToken.id
      let whereCondition = {
        [Op.or]: [
          { userId }, // 找出使用者相關的運動
          { userId: null } // 找出原本沒有包含使用者的運動
        ]
      }
      if (bodypartName && bodypartName !== 'all') {
        whereCondition = {
          ...whereCondition,
          '$Bodypart.name$': bodypartName
        }
      }
      Exercise.findAll({
        where: whereCondition,
        include: {
          model: Bodypart,
          attributes: ['name']
        },
        raw: true
      })
        .then(exercises => {
          const data = exercises.map(e => ({
            ...e
          }))
          res.json(data)
        })
        .catch(err => {
          console.error(err)
          res.status(500).send('Internal Server Error')
        })
    }
  }
}

module.exports = exerciseController

const { Exercise, Bodypart } = require('../../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
// const { User } = require('../../models')

const exerciseController = {
  getExercises: (req, res) => {
    const token = req.cookies.token
    const bodypartName = req.query.bodypart
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
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
      } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'Unauthorized' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  },
  getBodyparts: (req, res) => {
    const token = req.cookies.token
    if (token) {
      try {
        Bodypart.findAll({
          attributes: ['name'],
          raw: true
        })
          .then(bodyparts => {
            const bodypartNames = bodyparts.map(bodypart => bodypart.name)
            res.json(bodypartNames)
          })
          .catch(err => {
            console.error(err)
            res.status(500).send('Internal Server Error')
          })
      } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'Unauthorized' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  },
  postExercise: (req, res) => {
    const token = req.cookies.token

    if (token) {
      try {
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        // const userId = decodedToken.id
      } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'Unauthorized' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}

module.exports = exerciseController

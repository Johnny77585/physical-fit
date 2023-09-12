const { Exercise, Bodypart } = require('../../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { localFileHandler } = require('../../helpers/file-helpers')

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
          attributes: ['id', 'name'],
          raw: true
        })
          .then(bodyparts => {
            res.json(bodyparts)
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
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        const { file } = req
        localFileHandler(file)
          .then(filePath => {
            if (filePath) {
              Exercise.create({
                userId,
                bodypartId: req.body.bodypart,
                name: req.body.name,
                photo: filePath || null
              })
                .then(exercise => {
                  res.status(201).json({ message: 'Exercise created successfully', exercise })
                })
                .catch(err => {
                  console.error(err)
                  res.status(500).json({ message: 'Internal Server Error' })
                })
            } else {
              res.status(500).json({ message: 'File processing error' })
            }
          })
          .catch(err => {
            console.error(err)
            res.status(500).json({ message: 'File processing error' })
          })
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

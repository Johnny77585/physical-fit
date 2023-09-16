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
        const exerciseWhereClause = {
          [Op.or]: [
            { userId }, // 找出使用者相關的運動
            { userId: null } // 找出原本沒有包含使用者的運動
          ]
        }
        Exercise.findAll({
          where: exerciseWhereClause,
          include: [{
            model: Bodypart,
            attributes: [],
            where: (bodypartName !== 'all') ? { name: bodypartName } : {} // all的話，就不要有where條件
          }],
          attributes: ['id', 'user_id', 'name', 'photo', 'bodypart_id'],
          raw: true
        })
          .then(exercises => {
            res.json(exercises)
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
                bodypartId: req.body.bodypartOption,
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
  },
  putExercise: (req, res) => {
    const token = req.cookies.token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        const exerciseId = req.body.exerciseId
        Exercise.findOne({
          where: {
            id: exerciseId,
            userId
          }
        })
          .then(exercise => {
            if (!exercise) {
              return res.status(404).json({ message: 'Exercise not found or unauthorized' })
            }
            const { file } = req
            if (file) {
              localFileHandler(file)
                .then(filePath => {
                  if (filePath) {
                    exercise.update({
                      bodypartId: req.body.modifyBodypart,
                      name: req.body.modifyName,
                      photo: filePath
                    })
                      .then(updatedExercise => {
                        res.status(200).json({ message: 'Exercise updated successfully', exercise: updatedExercise })
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
            } else {
              exercise.update({
                bodypartId: req.body.modifyBodypart,
                name: req.body.modifyName
              })
                .then(updatedExercise => {
                  res.status(200).json({ message: 'Exercise update suceessfully' })
                })
                .catch(err => {
                  console.error(err)
                  res.status(500).json({ message: 'Internal Server Error' })
                })
            }
          })
          .catch(err => {
            console.error(err)
            res.status(500).json({ message: 'Internal Server Error' })
          })
      } catch (err) {
        console.error(err)
        res.status(401).json({ message: 'Unauthorized' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  },
  deleteExercise: (req, res) => {
    const token = req.cookies.token
    if (token) {
      try {
        const exerciseId = req.params.exerciseId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        Exercise.findOne({
          where: {
            id: exerciseId,
            userId
          }
        })
          .then(exercise => {
            if (!exercise) {
              return res.status(404).json({ message: 'Exercise not found or unauthorized' })
            }
            exercise.destroy()
            return res.status(200).json({ message: 'Exercise deleted successfully' })
          })
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }
}

module.exports = exerciseController

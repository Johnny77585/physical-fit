const { List, ExerciseList, Exercise } = require('../../models')
const jwt = require('jsonwebtoken')

const exerciseListController = {
  getExerciseLists: (req, res) => {
    const token = req.cookies.token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        List.findAll({
          where: {
            userId
          },
          include: [{
            model: ExerciseList,
            include: Exercise
          }],
          raw: true,
          nest: true
        })
          .then(lists => {
            res.json(lists)
          }).catch(error => {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
          })
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  },
  postExerciseList: (req, res) => {
    const token = req.cookies.token
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: '未輸入名稱' })
    }
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        List.create({
          userId,
          name
        })
          .then(createdList => {
            res.status(201).json(createdList)
          })
          .catch(error => {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
          })
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  },
  putExerciseList: (req, res) => {
    const { listId } = req.params
    const { exerciseId } = req.body

    if (!listId || !exerciseId) {
      return res.status(400).json({ message: 'no listId or exerciseId' })
    }
    const token = req.cookies.token
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.id
        List.findOne({
          where: {
            userId,
            id: listId
          }
        })
          .then(list => {
            if (!list) {
              return res.status(404).json({ message: 'list not found' })
            }
            ExerciseList.create({
              listId: list.id,
              exerciseId
            })
              .then(() => {
                res.status(200).json({ message: 'add exercise successfully' })
              })
              .catch(error => {
                console.error(error)
                return res.status(500).json({ message: 'Internal Server Error' })
              })
          })
          .catch(error => {
            console.error(error)
            return res.status(500).json({ message: 'Internal Server Error' })
          })
      } catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }

}
module.exports = exerciseListController

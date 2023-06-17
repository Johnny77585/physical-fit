const { Exercise, Bodypart } = require('../../models')

const exerciseController = {
  getExercises: (req, res) => {
    return Exercise.findAll({
      include: Bodypart,
      nest: true,
      raw: true
    }).then(exercises => {
      const data = exercises.map(e => ({
        ...e
      }))
      res.json(data)
    }).catch(err => {
      console.log(err)
      res.status(500).send('Internal Server Error')
    })
  }
}

module.exports = exerciseController

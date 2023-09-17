const exerciseController = {
  getExercises: (req, res) => {
    res.render('exercises')
  },
  getExerciseLists: (req, res) => {
    res.render('exerciseLists')
  }
}
module.exports = exerciseController

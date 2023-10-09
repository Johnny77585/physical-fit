const exerciseController = {
  getExercises: (req, res) => {
    res.render('exercises')
  },
  getExerciseLists: (req, res) => {
    res.render('exerciseLists')
  },
  getDailyLists: (req, res) => {
    res.render('dailyList')
  }
}
module.exports = exerciseController

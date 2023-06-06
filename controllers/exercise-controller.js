const exerciseController = {
  getExercises: (req, res) => {
    res.render('exercises', { layout: 'layouts/main', body: '' })
  }
}
module.exports = exerciseController

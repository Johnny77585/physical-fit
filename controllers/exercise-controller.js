const exerciseController = {
  getExercises: (req, res) => {
    res.render('exercises', { layout: 'layouts/main', body: 'exercises' })
  }
}
module.exports = exerciseController
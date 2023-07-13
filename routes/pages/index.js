const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/auth')
const passport = require('../../config/passport')
const userController = require('../../controllers/pages/user-controller')
const exerciseController = require('../../controllers/pages/exercise-controller')

const { generalErrorHandler } = require('../../middleware/error-handler')

router.get('/signin', (req, res) => {
  res.render('signin')
})
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/exercises', authenticated, exerciseController.getExercises)
router.use('/', generalErrorHandler)
module.exports = router

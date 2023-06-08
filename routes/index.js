const express = require('express')

const router = express.Router()
const passport = require('../config/passport')
const exerciseController = require('../controllers/exercise-controller')
const userController = require('../controllers/user-controller')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)
router.get('/exercises', authenticated, exerciseController.getExercises)
router.use('/', (req, res) => res.redirect('/exercises'))
router.use('/', generalErrorHandler)
module.exports = router

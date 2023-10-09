const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/auth')
const passport = require('../../config/passport')
const userController = require('../../controllers/pages/user-controller')
const exerciseController = require('../../controllers/pages/exercise-controller')

const { generalErrorHandler } = require('../../middleware/error-handler')
router.get('/', authenticated, (req, res) => res.redirect('exercises'))
router.get('/signin', (req, res) => { res.render('signin') })
router.get('/signup', (req, res) => { res.render('signup') })
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.post('/signup', userController.signUp)
router.get('/exercises', authenticated, exerciseController.getExercises)
router.get('/exerciseLists', authenticated, exerciseController.getExerciseLists)
router.get('/dailyList', authenticated, exerciseController.getDailyLists)

router.get('/logout', userController.logout)
router.use('/', generalErrorHandler)
module.exports = router

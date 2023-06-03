const express = require('express')

const router = express.Router()
const exerciseController = require('../controllers/exercise-controller')
const userController = require('../controllers/user-controller')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/exercises', exerciseController.getExercises)
router.use('/', (req, res) => res.redirect('/exercises'))

module.exports = router

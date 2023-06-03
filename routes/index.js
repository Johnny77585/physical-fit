const express = require('express')

const router = express.Router()
const exerciseController = require('../controllers/exercise-controller')
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/exercises', exerciseController.getExercises)
router.use('/', (req, res) => res.redirect('/exercises'))
router.use('/', generalErrorHandler)
module.exports = router

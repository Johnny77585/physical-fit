const express = require('express')

const router = express.Router()

const exerciseController = require('../controllers/exercise-controller') 

router.get('/exercises', exerciseController.getExercises)

router.use('/', (req, res) => res.redirect('/exercises'))

module.exports = router

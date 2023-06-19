const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/api-auth')
const exerciseController = require('../../controllers/apis/exercise-controller')
const { apiErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const userController = require('../../controllers/apis/user-controller')

router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.get('/exercises', authenticated, exerciseController.getExercises)
router.use('/', apiErrorHandler)
module.exports = router

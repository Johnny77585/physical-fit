const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/api-auth')
const { apiErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const userController = require('../../controllers/apis/user-controller')
const exerciseController = require('../../controllers/apis/exercise-controller')

router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)
router.get('/exercises', authenticated, exerciseController.getBodyparts)
router.get('/bodyparts', authenticated, exerciseController.getBodyparts)

router.use('/', apiErrorHandler)
module.exports = router

const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const userController = require('../../controllers/apis/user-controller')
const exerciseController = require('../../controllers/apis/exercise-controller')
const upload = require('../../middleware/multer')

router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)
router.get('/exercises', exerciseController.getExercises)
router.get('/bodyparts', exerciseController.getBodyparts)

router.post('/exercises', upload.single('image'), exerciseController.postExercise)
// router.put('/exercises', upload.single('image'), exerciseController.putExercise)

router.use('/', apiErrorHandler)
module.exports = router

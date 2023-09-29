const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const passport = require('../../config/passport')
const userController = require('../../controllers/apis/user-controller')
const exerciseController = require('../../controllers/apis/exercise-controller')
const exerciseListController = require('../../controllers/apis/exerciseList-controller')

const upload = require('../../middleware/multer')

router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)
router.get('/exercises', exerciseController.getExercises)
router.get('/bodyparts', exerciseController.getBodyparts)

router.post('/exercises', upload.single('photo'), exerciseController.postExercise)
router.put('/exercises', upload.single('modifyPhoto'), exerciseController.putExercise)
router.delete('/exercises/:exerciseId', exerciseController.deleteExercise)
router.get('/exerciselists', exerciseListController.getExerciseLists)
router.post('/exerciselist', exerciseListController.postExerciseList)

router.use('/', apiErrorHandler)
module.exports = router

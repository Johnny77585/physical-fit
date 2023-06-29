const express = require('express')
const router = express.Router()
const { authenticated } = require('../../middleware/auth')
const passport = require('../../config/passport')
const userController = require('../../controllers/pages/user-controller')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.get('/signin', (req, res) => {
  res.render('signin')
})
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/exercises', authenticated, (req, res) => {
  res.render('exercises')
})
router.use('/', generalErrorHandler)
module.exports = router

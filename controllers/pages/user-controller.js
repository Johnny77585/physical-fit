const bcrypt = require('bcryptjs')
const { User } = require('../../models')
const axios = require('axios')
const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    const { email, password } = req.body
    axios.post('http://localhost:3000/api/signin', {
      email,
      password
    })
      .then(response => {
        const token = response.data.data.token
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000 * 24 * 7) })
        res.redirect('/exercises')
      })
      .catch(error => {
        console.log(error)
      })
  },

  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    res.clearCookie('token', '', { httpOnly: true, expires: new Date(0) })
    req.logout()
    res.redirect('/signin')
  }
}
module.exports = userController

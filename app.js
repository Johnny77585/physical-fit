if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const PORT = 3000
const flash = require('connect-flash')
const session = require('express-session')
const SESSION_SECRET = 'secret'
const passport = require('./config/passport')
const { getUser } = require('./helpers/auth-helpers')
const ejsHelpers = require('./helpers/ejs-helpers')
const { pages, apis } = require('./routes')
const cookieParser = require('cookie-parser')

// 使用EJS做模板
app.use(express.static('./static'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.currentYear = ejsHelpers.currentYear
  next()
})
app.use(methodOverride('_method'))
app.use(passport.session())
app.use(cookieParser())
app.use(flash())
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  res.locals.user = getUser(req)
  next()
})
app.use('/api', apis)
app.use(pages)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

module.exports = app

const express = require('express')
const methodOverride = require('method-override')
const routes = require('./routes')
const path = require('path')
const app = express()
const PORT = 3000
const flash = require('connect-flash')
const session = require('express-session')
const SESSION_SECRET = 'secret'

// 使用EJS做模板
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  next()
})
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

module.exports = app

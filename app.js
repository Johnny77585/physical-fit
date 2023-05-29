const express = require('express')
const methodOverride = require('method-override')
const routes = require('./routes')
const path = require('path')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000

//使用EJS做模板
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

module.exports = app
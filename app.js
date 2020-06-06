const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const {handleError} = require('./app/helpers/error')

require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

require('./router')(app)

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
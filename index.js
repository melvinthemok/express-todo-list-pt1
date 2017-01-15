const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
const express = require('express')
const app = express()
const morgan = require('morgan')

mongoose.connect('mongodb://localhost/todo-list')
mongoose.Promise = global.Promise

app.use(morgan('dev'))

app.use('/todos', todosController)

app.get('/', (req, res) => {
  res.send('Your todos await.')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

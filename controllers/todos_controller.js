const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()
const morgan = require('morgan')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.use(morgan('dev'))

// CREATE

router.post('/', (req, res) => {
  Todo.create({
    name: req.body.name,
    description: req.body.description || req.body.name,
    completed: req.body.completed || false
  }, (err, newToDo) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.json(newToDo)
    }
  })
})

// test code
// curl -XPOST -H "Content-Type: application/json" -d '{"name":"Buy Cake","description":"you can never have too much"}' http://localhost:3000/todos

// READ
// List

router.get('/', (req, res) => {
  Todo.find({}, (err, itemsList) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.json(itemsList)
    }
  })
})

// Show

router.get('/:idx', (req, res) => {
  Todo.findById(req.params.idx, (err, item) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.json(item)
    }
  })
})

// UPDATE

router.put('/:idx', (req, res) => {
  Todo.update({ _id: req.params.idx }, req.body, (err, data) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.json(data)
    }
  })
})

// DESTROY
// Destroy a todo

router.delete('/:idx', (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.idx }, (err) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.send('Deleted.')
    }
  })
})

// // Destroy all todos
//
// router.delete('/', (req, res) => {
//   Todo.remove({}, (err) => {
//     if (err) {
//       console.log(err)
//       return
//     } else {
//       res.send('All deleted.')
//     }
//   })
// })

module.exports = router

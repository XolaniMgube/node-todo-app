/** @format */

const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/todo') // requiring the models file

const app = express()

// connect to mongodb
const dbURI =
  "mongodb+srv://xolani:njabs12345@nodetuts.qk2xo.mongodb.net/todo-app?retryWrites=true&w=majority";
  mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3001, () => console.log("listening of port 3001")))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true })) // for getting data from the form to the post request

app.use(express.static('public'))



app.get('/', (req, res) => {
  Todo.find()
    .then(result => res.render('index', {title: "The home", todos: result}))
    .catch(err => console.log(err))
  
})

app.get('/todo/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
  .then(result => {
    console.log(result)
    res.render('details', {title: "Details Details", todo: result})
  })
})

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Todo.findByIdAndDelete(id) 
    .then(result => {
      res.json({ redirect: '/'})
    })
    .catch(err => console.log(err))
  
})


app.post('/todos', (req, res) => {
  console.log(req.body)
  const todo = new Todo(req.body)
  todo.save() //.sort({ createdAt: -1 })
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
})
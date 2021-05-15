const { Router } = require('express')
const Todo = require('../models/Todo.js')
const router = Router()

router.get('/', async (req, res) => {

    const todos = await Todo.find({}).lean()
    

    res.render('index', {
        title: 'To-do list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create To-do'.anchor,
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})

module.exports = router

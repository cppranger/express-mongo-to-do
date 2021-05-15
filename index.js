const express = require('express')
const mongoose = require('mongoose')
const exphandbar = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
const mongo_connect = 'mongodb+srv://purp13:162534@test.ieldj.mongodb.net/to-do'
const app = express()
const bar = exphandbar.create({
    defaultLayout: 'main',
    extname: 'bar'
})

app.engine('bar', bar.engine)
app.set('view engine', 'bar')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(mongo_connect, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started on', PORT)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()

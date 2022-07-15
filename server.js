const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = '100hour',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        collection = db.collection('posts')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    db.collection('posts').find().toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addItem', (request, response) => {
    db.collection('posts').insertOne({ taskName: request.body.taskName, taskDate: request.body.taskDate, taskTask: request.body.taskTask, taskStatus: "Inbox" })
        .then(result => {
            console.log('Task Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.delete('/completedTask', (request, response) => {
    db.collection('posts').deleteOne({ taskName: request.body.taskName })
        .then(result => {
            console.log('Task Completed!')
            response.json('Task Completed!')
        })
        .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running...')
})
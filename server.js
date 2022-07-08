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
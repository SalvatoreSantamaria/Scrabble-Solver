require('dotenv').config()

const express = require('express')
const app = express()


// Database Setup
const mongoose = require('mongoose')
// Connect to mongodb database in env
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', () => console.log('Connected to database'))

// JSON Config
app.use(express.json())

// Routing Config for localhost:3000/words
const wordsRouter = require('./routes/words')
app.use('/words', wordsRouter)

app.listen(3000, () => console.log('Server Started'))
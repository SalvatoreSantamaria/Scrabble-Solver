// require('dotenv').config()

const express = require('express')
const app = express()

// JSON Config
app.use(express.json())

// Routing Config for localhost:3000/words
const wordsRouter = require('./routes/words')
app.use('/words', wordsRouter)

app.listen(8080, () => console.log('Server Started'))

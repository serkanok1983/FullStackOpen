const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Error connecting to MongoDB:', err))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

module.exports = app
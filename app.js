if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const keys = require('./config/keys').keys

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


const db = require('./config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true, })
        .then(() => {
            const port = process.env.PORT;
            app.listen(port, () => console.log(`Server running on port: ${port}`))
            console.log(`Connected to database: ${db}`)
        })
        .catch(err => console.log(`Unable to connect: ${err}`))


// Users Routes
const users = require('./routes/api/users')
app.use('/api/users', users)


// Events Routes
const events = require('./routes/api/events')
app.use('/api/events', events)
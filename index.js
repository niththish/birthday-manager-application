const express = require('express')
const morgan = require('morgan')
const birthdaysRouter = require('./routes/birthdays')
const authRouter = require('./routes/auth')

const app = express()

app.use(morgan('short'))
app.use(express.json())

// routes
app.get('/', (req, res) => { res.send('Hello World');  })
app.use('/auth',authRouter)
app.use('/api/birthdays',birthdaysRouter)

app.listen(3000, () => {console.log('Listening on port 3000')})
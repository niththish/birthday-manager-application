const express = require('express')
const morgan = require('morgan')
const birthdaysRouter = require('./routes/birthdays')
const authRouter = require('./routes/auth')
const databaseConnection = require('./config/database')
const authenticate = require('./middleware/authenticate')
require('dotenv').config()

const app = express()

app.use(morgan('short'))
app.use(express.json())

// routes
app.get('/', (req, res) => { res.send('Hello World');  })
app.use('/auth',authRouter)
app.use('/api/birthdays',authenticate,birthdaysRouter)


// start server
const startApplication = async() => {
    await databaseConnection(process.env.MONGOURL)
    console.log('connected to database')
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
}
startApplication()
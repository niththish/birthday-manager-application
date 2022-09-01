const express = require('express')
const morgan = require('morgan')
const birthdaysRouter = require('./routes/birthdays')
const authRouter = require('./routes/auth')
const databaseConnection = require('./config/database')
const authenticate = require('./middleware/authenticate')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.static('./public'))
app.use(morgan('short'))
app.use(express.json())

// routes
app.get('/birthdays',(req,res,next) => {
    console.log(__dirname);
    res.sendFile('public/birthdays.html',{root : __dirname})
})

app.get('/allbirthdays',(req,res,next) => {
    res.sendFile('/public/allbirthdays.html',{root : __dirname})
})

app.use('/auth',authRouter)
app.use('/api/birthdays',authenticate,birthdaysRouter)

app.use(errorHandler)

// start server
const startApplication = async() => {
    await databaseConnection(process.env.MONGOURL)
    console.log('connected to database')
    const PORT = process.env.PORT
    app.listen(PORT,() => {
        console.log(`Listening on port ${PORT}`)
    })
}
startApplication()
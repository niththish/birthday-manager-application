const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('short'))
app.use(express.json())



app.get('/', (req, res) => { res.send('Hello World');  })

app.listen(3000, () => {console.log('Listening on port 3000')})
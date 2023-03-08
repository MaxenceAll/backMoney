// gestion variable environnement (voir .env)
const dotenv = require('dotenv')
dotenv.config()

// using express framework
const express = require('express')
const app = express()

// Need cors for cross origin
const cors = require('cors')

// création d'une variable globale du port importée de .env
const PORT = process.env.PORT;

// importation de la connexion à la DB
const {db} = require ('./db/db.js')

// getreaddirSync from fs module
const {readdirSync} = require ('fs')


// Middlewares :
// first :
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map( (route) => app.use('/api/v1', require('./routes/' + route)))



// get home page:
app.get('/', (req, res) => {
    res.send('Hello World 1!')
})

const server = () => {
    db()
    app.listen(PORT, ()=> {
        console.log(`Listening to port ${PORT}.`)
    })
}

server()
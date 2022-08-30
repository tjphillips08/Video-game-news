const express = require('express');

//need to set up DB connection
require('./config/db.connections')
const gamesController = require('./controllers/game_controller')
const commentsController = require("./controllers/comment_controller")

//app configuration
const app = express()
const PORT = 4000
app.set('view engine', 'ejs')


//Middleware for each request
app.use('/games', gamesController)
app.use("/games/:id", commentsController)
app.use(express.static('public'))



//server
app.listen(4000, () => console.log('starting server at port:', PORT))
const express = require('express');
const path = require('path');
const cors = require('cors')

require('dotenv').config()
require('./db/database')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const interviewRouter = require('./routes/interviews')

const app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parses incoming requests with JSON payloads
app.use(express.json());
//parses incoming requests with urlencoded payloads 
app.use(express.urlencoded({ extended: true }));
// addding css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/interviews', interviewRouter);

const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("$", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port,() =>{
  console.log('Server is up on',port)
})



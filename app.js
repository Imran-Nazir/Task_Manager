const express= require('express');
const router = require('./src/routes/api');
const bodyParser = require('body-parser');
const app = new express();

//middleware
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

//mongoose require
const mongoose = require('mongoose');

//middleware use
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//bodyparser use
app.use(bodyParser.json());

//set limiter
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max:100 
})

app.use(limiter);

//mongodb connection
//const URI = "mongodb://127.0.0.1:27017/TaskManager";
const URI = "mongodb+srv://minazir34:aA1234__@cluster0.qpju89p.mongodb.net/?retryWrites=true&w=majority"
const OPTION = {user:'', pass:'', autoIndex:true}; 
mongoose.connect(URI, OPTION).then(()=>{
    console.log("Successfully connected to database");
}).catch((err)=>{console.error(err);})

//api use
app.use('/api/v1', router);

//if any error
app.use("*", (req, res)=>{
    res.status(404).json({status: 'Failed', data: 'Not Found'})
})

module.exports = app;